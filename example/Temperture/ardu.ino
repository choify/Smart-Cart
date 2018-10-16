#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <DHT.h>

#define DHTTYPE DHT22
#define DHTPIN 2

const char* ssid = "<SSID>";
const char* password = "<PASSWORD>";

// Create an instance of the server
// specify the port to listen on as an argument
ESP8266WebServer server(80);

// threshold for cycle counts
DHT dht(DHTPIN, DHTTYPE, 12); // 12 works fine for esp8266

float temp, humi;
String webString="";
unsigned long previousMillis = 0;
const long interval = 2000;

void setup() {
  Serial.begin(115200);
  delay(10);

  dht.begin();
  
  // Connect to WiFi network
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  
  // Start the server
  server.on("/events", handleevents);
  server.begin();

  // Print the IP address
  Serial.println(WiFi.localIP());
}

void loop() {
  server.handleClient();
}

void handleevents() {
  gettemphumi();
  webString="{\"temperature\": \"" + String(temp) + "\", \"humidity\": \"" + String(humi) + "\" }";
  Serial.println(webString);
  server.send(200, "text/plain", webString);
  yield();
}

void gettemphumi() {
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    humi = dht.readHumidity();
    temp = dht.readTemperature(false);
    if (isnan(humi) || isnan(temp)) {
      Serial.println("Failed to read dht sensor.");
      return;
    }
  }
}