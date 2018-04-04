from . import mqttGet
from channels import Group

def hello(message):
	print(message.content['text'])  # long running task or printing

# Connected to websocket.connect
def ws_add(message):
    # Accept the incoming connection
    message.reply_channel.send({"accept": True})
    # Add them to the chat group
    Group("sensor_data").add(message.reply_channel)

# Connected to websocket.receive
def ws_message(message):
	Group("sensor_data").send({
		"text": message.content['text'],
	})
	print(message.content['text'])

	Group("sensor_data").send({'text' : 'Hello from consumers.py!'})

# Connected to websocket.disconnect
def ws_disconnect(message):
    Group("sensor_data").discard(message.reply_channel)

def mqtt_client(message):
	if mqttGet.loopStarted == False:
		mqttGet.loopStarted = True
		try:
			mqttGet.client.loop_start()
		except KeyboardInterrupt:
			print('disconnect')
			mqttGet.client.disconnect()
	else:
		print('mqtt Client already started')	
