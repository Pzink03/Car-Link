# CarCar

Team:

- Nick Ignatovich - Service
- Pete Zink - Sales

## Design

## Service microservice

Models:

- Technician: first name, last name, employee id
- AutomobileVO: vin, sold
- Appointment: date time, reason, status, vin, customer, technician (foreign key)

Special features:

1. VIP customer designation for clients who bought one of our vehicles. Implementation
   will be on react side when creating a list for all appointments.
2. Appointment Status - Canceled/Finished - will get moved to service history page after
   status has been updated

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
