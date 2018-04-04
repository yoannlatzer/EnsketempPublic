from django.shortcuts import render
from .models import Measurement
from .models import Sensor
#from channels import Channel

# Create your views here.

sensor_list = Sensor.objects.all()

def index(request, template="index.html"):
	#message = {'text' : 'Hello from view.py!'}
	#Channel('test').send(message)

	measurements = Measurement.objects.all()
	last_object = Measurement.objects.latest('id')
	j = int(last_object.id) -50

	last_measurements = []
	for s in sensor_list:
		tempL = str(Measurement.objects.filter(device_id=s).order_by('-id')[:1])
		last_measurements.append(tempL.split(" "))
	
	past50_measurements = []
	for i in range(0, 50):
		temp = str(Measurement.objects.filter(id=j + i))
		past50_measurements.append(temp.split(" "))

	return render(
		request, 
		template,
		#dict(),
		{'sensor_l':sensor_list, 'measurements':measurements, 'last_m':last_measurements, 'past50':past50_measurements},
	)
