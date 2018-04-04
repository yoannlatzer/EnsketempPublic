from django.contrib import admin
from .models import Measurement
from .models import Sensor

# Register your models here.

admin.site.register(Measurement)
admin.site.register(Sensor)


