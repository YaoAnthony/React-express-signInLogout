from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers #Get 请求
from django.core.serializers.json import DjangoJSONEncoder #Get 请求

from app import models
import json
import uuid


# Create your views here.
def write_server(req):
    data = json.loads(req.body)
    data['id'] = uuid.uuid4()
    models.Person.objects.create(**data)
    res = {
        'success' : True
    }
    return HttpResponse(json.dumps(res), content_type = 'application/json')


def read_server(req):
    name = req.GET['name']
    filterModel = models.Person.objects.filter(name = name)
    data = serializers.serialize('python', filterModel)
    
    res = {
        'success' : True,
        'data' : data
    }
    return HttpResponse(json.dumps(res, cls=DjangoJSONEncoder), content_type = 'application/json')

    