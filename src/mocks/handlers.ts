import { http, HttpResponse } from 'msw';
import { Team } from '../App';

const teams: Team[] = [
    {
        id: '1',
        name: 'Frontend Team',
        createdAt: '2022-05-01',
        members: [
            { id: 1, name: 'Alice Smith', role: 'Engineer', email: 'alice@example.com' },
            { id: 2, name: 'Bob Johnson', role: 'Engineer', email: 'bob@example.com' }
        ]
    },
    {
        id: '2',
        name: 'Backend Team',
        createdAt: '2022-06-15',
        members: [
            { id: 3, name: 'Charlie Brown', role: 'Engineer', email: 'charlie@example.com' },
            { id: 4, name: 'Diana Prince', role: 'Tech Lead', email: 'diana@example.com' }
        ]
    },
    {
        id: '3',
        name: 'Design Team',
        createdAt: '2023-01-20',
        members: [
            { id: 5, name: 'Eva Green', role: 'Designer', email: 'eva@example.com' },
            { id: 6, name: 'Frank Ocean', role: 'UX Researcher', email: 'frank@example.com' }
        ]
    },
    {
        id: '4',
        name: 'Marketing Team',
        createdAt: '2023-03-10',
        members: [
            { id: 7, name: 'Grace Lee', role: 'SEO Specialist', email: 'grace@example.com' },
            { id: 8, name: 'Henry Ford', role: 'Content Strategist', email: 'henry@example.com' }
        ]
    },
    {
        id: '5',
        name: 'Sales Team',
        createdAt: '2022-08-05',
        members: [
            { id: 9, name: 'Irene Adler', role: 'Sales Manager', email: 'irene@example.com' },
            { id: 10, name: 'Jack Reacher', role: 'Account Exec', email: 'jack@example.com' }
        ]
    },
    {
        id: '6',
        name: 'DevOps Team',
        createdAt: '2022-11-22',
        members: [
            { id: 11, name: 'Karen Page', role: 'DevOps Engineer', email: 'karen@example.com' },
            { id: 12, name: 'Leo Messi', role: 'Site Reliability Engineer', email: 'leo@example.com' }
        ]
    },
    {
        id: '7',
        name: 'Product Team',
        createdAt: '2023-02-12',
        members: [
            { id: 13, name: 'Mia Wallace', role: 'Product Manager', email: 'mia@example.com' },
            { id: 14, name: 'Ned Stark', role: 'Product Owner', email: 'ned@example.com' }
        ]
    },
    {
        id: '8',
        name: 'QA Team',
        createdAt: '2023-04-01',
        members: [
            { id: 15, name: 'Olivia Wilde', role: 'QA Engineer', email: 'olivia@example.com' },
            { id: 16, name: 'Paul Rudd', role: 'Automation Engineer', email: 'paul@example.com' }
        ]
    },
    {
        id: '9',
        name: 'Support Team',
        createdAt: '2022-07-30',
        members: [
            { id: 17, name: 'Quinn Mallory', role: 'Support Lead', email: 'quinn@example.com' },
            { id: 18, name: 'Rachel Green', role: 'Support Rep', email: 'rachel@example.com' }
        ]
    },
    {
        id: '10',
        name: 'Data Team',
        createdAt: '2023-03-25',
        members: [
            { id: 19, name: 'Steve Rogers', role: 'Data Analyst', email: 'steve@example.com' },
            { id: 20, name: 'Tina Fey', role: 'Data Scientist', email: 'tina@example.com' }
        ]
    }
];

export const handlers = [
    http.get('/api/teams', async () => {
        return HttpResponse.json({ teams });
    }),

    http.patch('/api/teams/:teamId', async ({ params, request }) => {
        const updated = await request.json();
        const team = teams.find(t => t.id === params.teamId);
        if (team) {
            Object.assign(team, updated);
        }
        return HttpResponse.json(team);
    })
];