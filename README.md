# CarCar

Team:

- Nick Ignatovich - Service
- Pete Zink - Sales

## Design

## Service microservice

Models:

- Technician: first name, last name, employee id
- AutomobileVO: vin, sold
- Appointment: date-time, reason, status, vin, vip, customer, technician (foreign key)

Backend:

- Created backend views to handle creating/listing technicians, and creating/listing appointments.
  Added functionality to update appointment status after creating one. I was not able to implement
  statuses without having them hard-coded in the admin panel. So upon every database wipe, I had to
  go into the admin panel to add my 3 statuses into the database (created, canceled, finished). I
  was hoping to finish all of my functionality first before going back to fine tune the statuses.

Frontend:

- By fetching data from the inventory microservice, I was able to populate my appointments/service history lists
  with automobile data, and set the VIP status to either true or false based on whether the vehicle vin existed
  in our inventory prior. I did not get a chance to fine tune the functionality to also depend on the sold status
  of the same vehicle.

## Sales microservice

Models:
Using my poller I was able to set an AutomobileVO with the vin and sold status of the automobiles in the inventory.
I used the unique vin automobile to get specific data about that automobile. I was able to change the sold status
of an automobile to true any time a new sale is made. With this I was also able to prevent any automobiles from being sold twice.
