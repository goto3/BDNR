module.exports = class VaccinationFulfilledEvent {
	constructor(documentId, date, schedule, state, zone, birthDate) {
		this.DocumentId = documentId;
		this.Date = date;
		this.Schedule = schedule;
		this.State = state;
		this.Zone = zone;
		this.BirthDate = birthDate;
	}
};
