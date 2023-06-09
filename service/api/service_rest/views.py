from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import TechnicianEncoder, AppointmentEncoder

from .models import Appointment, Technician


@require_http_methods(["GET", "POST"])
def list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the technician"}
            )
            response.status_code = 400
            return response

@require_http_methods(["DELETE"])
def show_technician(request, id):
    count, _ = Technician.objects.filter(id=id).delete()
    return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            technician_id = content["technician"]
            technician = Technician.objects.get(id=technician_id)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician id"},
                status=400,
            )
        
        appointment = Appointment.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )


def show_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
    )


@require_http_methods(["PUT"])
def cancel_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.cancel()
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
    )


@require_http_methods(["PUT"])
def finish_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.finish()
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
    )