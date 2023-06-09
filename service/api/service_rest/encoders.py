from common.json import ModelEncoder

from .models import (
    AutomobileVO, 
    Appointment, 
    Technician,
)

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "vin",
        "customer",
        "technician",
        "vip",
        "status",
    ]

    encoders = {
        "technician": TechnicianEncoder(),
    }

    def get_extra_data(self, o):
        return {"status": o.status.name}