export function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function validateConsecutiveDates(selectedDates) {
  for (let i = 0; i < selectedDates.length - 1; i++) {
    const currentDate = selectedDates[i];
    const nextDate = selectedDates[i + 1];
    
    if ((nextDate.getTime() - currentDate.getTime()) !== 86400000) {
      return false;
    }
  }
  return true;
}

export function sortSelectedDates(selectedDates) {
  return selectedDates.sort((a, b) => a.getTime() - b.getTime());
}

// Function to validate selected dates
export function validateSelectedDates(selectedDates) {
  const currentDate = new Date(); // Get current date without time
  currentDate.setHours(0, 0, 0, 0); // Set time to 00:00:00:00

  // Loop through selected dates
  for (const date of selectedDates) {
    // If any selected date is before the current date, return false
    if (date < currentDate) {
      return false;
    }
  }

  // All selected dates are after or equal to the current date, return true
  return true;
}

export async function updateLeaveDetailData(id, dataToUpdate) {
  try {
    const response = await axios.put(`/api/leaveRequestDetail/${id}/`, dataToUpdate);
    console.log('Updated data:', response.data);
    return response.data; // Return the updated data if needed
  } catch (error) {
    console.error('Error updating data:', error);
    throw error; // Handle the error as needed
  }
}
