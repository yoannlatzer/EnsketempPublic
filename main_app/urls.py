from django.conf.urls import url
from . import views
from channels import Channel

urlpatterns = [
	url(r'^$', views.index)
]

# Send an empty message to start the mqtt script 
# in the background on server startup
message = {}
Channel('mqtt_start').send(message)
