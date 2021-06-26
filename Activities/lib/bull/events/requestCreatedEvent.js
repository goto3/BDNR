module.exports = class RequestCreatedEvent {
	constructor(documentId, date, schedule, state, zone) {
		this.DocumentId = documentId;
		this.Date = date;
		this.Schedule = schedule;
		this.State = state;
		this.Zone = zone;
	}
};
