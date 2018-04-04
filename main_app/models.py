from django.db import models

# Create your models here.

class Measurement(models.Model):
	measurement_type = models.CharField(max_length=100)
	device_id = models.CharField(max_length=100)
	#value = models.DecimalField(max_digits=10, decimal_places=4)
	value = models.CharField(max_length=50)
	#location = models.CharField(max_length=50)
	latitude = models.CharField(max_length=50)
	longitude = models.CharField(max_length=50)
	day = models.IntegerField()
	month = models.IntegerField()
	year = models.IntegerField()
	hour = models.IntegerField()
	minute = models.IntegerField()
	
	def __str__(self):
		return '%s %s %s %s %s %s %s %s %s %s' % (self.device_id, self.value, self.latitude, self.longitude, self.day, self.month, self.year, self.hour, self.minute, self.id)

class Sensor(models.Model):
	device_id = models.CharField(max_length=100)
	
	def __str__(self):
		return '%s' % (self.device_id)
