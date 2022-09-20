import Calendly from '../Calendly';
import ActivityLog from '../endpoints/ActivityLog';
import DataCompliance from '../endpoints/DataCompliance';
import EventTypes from '../endpoints/EventTypes';
import ScheduledEvents from '../endpoints/ScheduledEvents';
import Users from '../endpoints/Users';

import { config } from 'dotenv';
config();
const uri = 'https://api.calendly.com/users/me';

const CALENDLY_ACCESS_TOKEN = process.env.CALENDLY_ACCESS_TOKEN || '';
const EXPECTED_ME = process.env.EXPECTED_ME || '';
const EXPECTED_ORGANIZATION = process.env.EXPECTED_ORGANIZATION || '';

jest.spyOn(global, 'fetch').mockImplementation(
    jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    resource: {
                        uri: EXPECTED_ME,
                        current_organization: EXPECTED_ORGANIZATION,
                    },
                }),
        }),
    ) as jest.Mock,
);

beforeEach(() => {
    jest.clearAllMocks();
});

test('Calendly is instantiable', () => {
    expect(new Calendly(CALENDLY_ACCESS_TOKEN)).toBeInstanceOf(Calendly);
});

test('Calendly transforms uris to uuids', () => {
    expect(Calendly.getUuidFromUri(uri)).toBe('me');
});

test('Calendly users endpoint', () => {
    const calendly = new Calendly(CALENDLY_ACCESS_TOKEN);
    expect(calendly.users).toBeInstanceOf(Users);
});

test('Calendly ActivityLog endpoint', () => {
    const calendly = new Calendly(CALENDLY_ACCESS_TOKEN);
    expect(calendly.activityLog).toBeInstanceOf(ActivityLog);
});

test('Calendly DataCompliance endpoint', () => {
    const calendly = new Calendly(CALENDLY_ACCESS_TOKEN);
    expect(calendly.dataCompliance).toBeInstanceOf(DataCompliance);
});

test('Calendly EventTypes endpoint', () => {
    const calendly = new Calendly(CALENDLY_ACCESS_TOKEN);
    expect(calendly.eventTypes).toBeInstanceOf(EventTypes);
});

test('Calendly ScheduledEvents endpoint', () => {
    const calendly = new Calendly(CALENDLY_ACCESS_TOKEN);
    expect(calendly.scheduledEvents).toBeInstanceOf(ScheduledEvents);
});

test('Calendly getMe', async () => {
    const calendly = new Calendly(CALENDLY_ACCESS_TOKEN);
    expect(await calendly.getMe()).toBe(EXPECTED_ME);
    expect(fetch).toHaveBeenCalledTimes(1);
});

test('Calendly getOrganizationUri', async () => {
    const calendly = new Calendly(CALENDLY_ACCESS_TOKEN);
    expect(await calendly.getOrganizationUri()).toBe(EXPECTED_ORGANIZATION);
    expect(fetch).toHaveBeenCalledTimes(1);
});
