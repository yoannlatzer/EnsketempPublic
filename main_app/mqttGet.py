# Required: pip install paho-mqtt
import paho.mqtt.client as mqtt
import json
import base64
import datetime
import re

from channels import Group
from .models import Measurement

loopStarted = False

APPEUI = '70B3D57ED000855B'
APPID  = 'enschede_temp'
ACCESSKEY = 'ttn-account-v2.QlKXAWBPH0RpskzumkrfZMCrLZXkJWmYRTmAoxvnBpY'

def on_connect(client, userdata, flag, rc):
	print("Connected with result code "+str(rc))
	client.subscribe('+/devices/+/up'.format(APPEUI))

def on_message(client, userdata, msg):
	j_msg = json.loads(msg.payload.decode('utf-8'))
	dev_id = j_msg['dev_id']
	time = j_msg['metadata']['gateways'][0]['time']
	time_array = re.split('-|T|:', time)

	payload = base64.b64decode(j_msg['payload_raw'])
	info = payload.decode("utf-8")
	info_array = re.split('t|L|l',info)

	# print data
	print('-------------------------------------------------')
	print('-------------------------------------------------')
	print('metadata: ', j_msg)
	print('-------------------------------------------------')
	print('time_array: ', time_array)
	print('info_array: ', info_array)
	print('device_id: ', dev_id)

	i = datetime.datetime.now()
	temp = Measurement(measurement_type='temperature', device_id= dev_id, value=info_array[1], latitude=info_array[2], longitude=info_array[3], day=i.day, month=i.month, year=i.year, hour=i.hour, minute=i.minute)
	temp.save()

	print('-------------------------------------------------')
	print('Recorded in the database: ', temp)
	print('-------------------------------------------------')

	temp_string = str(temp.id) + ' '+ str(temp)
	Group("sensor_data").send({'text' : temp_string})

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.username_pw_set(APPID, ACCESSKEY)
client.connect("eu.thethings.network", 1883, 60)
