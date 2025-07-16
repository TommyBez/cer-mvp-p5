import mqtt from 'mqtt';

export interface SmartMeterReading {
  deviceId: string;
  timestamp: Date;
  energyProduced: number; // kWh
  energyConsumed: number; // kWh
  instantPower: number; // kW
  voltage: number; // V
  current: number; // A
  powerFactor: number;
}

export interface MQTTConfig {
  broker: string;
  port: number;
  username?: string;
  password?: string;
  clientId: string;
  topics: {
    subscribe: string[];
    publish: string;
  };
}

export class SmartMeterMQTTClient {
  private client: mqtt.MqttClient | null = null;
  private config: MQTTConfig;
  private dataHandler: (data: SmartMeterReading) => void;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;

  constructor(config: MQTTConfig, dataHandler: (data: SmartMeterReading) => void) {
    this.config = config;
    this.dataHandler = dataHandler;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `mqtt://${this.config.broker}:${this.config.port}`;
      
      this.client = mqtt.connect(url, {
        clientId: this.config.clientId,
        username: this.config.username,
        password: this.config.password,
        clean: true,
        reconnectPeriod: 5000,
      });

      this.client.on('connect', () => {
        console.log('Connected to MQTT broker');
        this.reconnectAttempts = 0;
        
        // Subscribe to configured topics
        this.config.topics.subscribe.forEach(topic => {
          this.client?.subscribe(topic, (err) => {
            if (err) {
              console.error(`Failed to subscribe to ${topic}:`, err);
            } else {
              console.log(`Subscribed to ${topic}`);
            }
          });
        });
        
        resolve();
      });

      this.client.on('message', (topic, message) => {
        try {
          const data = JSON.parse(message.toString());
          const reading: SmartMeterReading = {
            deviceId: data.deviceId || topic.split('/')[2], // Extract from topic if not in payload
            timestamp: new Date(data.timestamp || Date.now()),
            energyProduced: parseFloat(data.energyProduced || 0),
            energyConsumed: parseFloat(data.energyConsumed || 0),
            instantPower: parseFloat(data.instantPower || 0),
            voltage: parseFloat(data.voltage || 0),
            current: parseFloat(data.current || 0),
            powerFactor: parseFloat(data.powerFactor || 1),
          };
          
          this.dataHandler(reading);
        } catch (error) {
          console.error('Error parsing MQTT message:', error);
        }
      });

      this.client.on('error', (error) => {
        console.error('MQTT client error:', error);
        reject(error);
      });

      this.client.on('offline', () => {
        console.log('MQTT client offline');
      });

      this.client.on('reconnect', () => {
        this.reconnectAttempts++;
        if (this.reconnectAttempts > this.maxReconnectAttempts) {
          console.error('Max reconnection attempts reached');
          this.disconnect();
        }
      });
    });
  }

  publish(data: any): void {
    if (this.client && this.client.connected) {
      this.client.publish(this.config.topics.publish, JSON.stringify(data));
    }
  }

  disconnect(): void {
    if (this.client) {
      this.client.end();
      this.client = null;
    }
  }

  isConnected(): boolean {
    return this.client?.connected || false;
  }
}

// Simulator for development/testing
export class SmartMeterSimulator {
  private interval: NodeJS.Timeout | null = null;
  private devices: string[];
  
  constructor(deviceIds: string[]) {
    this.devices = deviceIds;
  }

  start(callback: (data: SmartMeterReading) => void, intervalMs: number = 5000): void {
    this.interval = setInterval(() => {
      this.devices.forEach(deviceId => {
        const reading: SmartMeterReading = {
          deviceId,
          timestamp: new Date(),
          energyProduced: Math.random() * 10 + 20, // 20-30 kWh
          energyConsumed: Math.random() * 15 + 10, // 10-25 kWh
          instantPower: Math.random() * 5 + 2, // 2-7 kW
          voltage: 220 + Math.random() * 10 - 5, // 215-225 V
          current: Math.random() * 30 + 10, // 10-40 A
          powerFactor: 0.85 + Math.random() * 0.15, // 0.85-1.0
        };
        callback(reading);
      });
    }, intervalMs);
  }

  stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}