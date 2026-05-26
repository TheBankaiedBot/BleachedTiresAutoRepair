import { createAppointment } from "../api";

async function handleSubmit() {
  const result = await createAppointment({
    serviceId,
    appointmentDate,
    appointmentTime,
    customerNotes
  });

  console.log(result);
}

import { getMyAppointments } from "../api";

useEffect(() => {
  getMyAppointments().then(data => {
    setAppointments(data.appointments);
  });
}, []);