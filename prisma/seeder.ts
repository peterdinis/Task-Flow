import { faker } from "@faker-js/faker";
import { PrismaClient } from "../lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Seeding database...");

	// Create Users
	const users = await Promise.all(
		Array.from({ length: 3 }).map(() =>
			prisma.user.create({
				data: {
					name: faker.person.fullName(),
					email: faker.internet.email(),
					password: faker.internet.password(),
				},
			}),
		),
	);

	// Create Boards (owned by users[0])
	const board = await prisma.board.create({
		data: {
			title: "Team Project",
			description: "Main team collaboration board",
			ownerId: users[0].id,
			members: {
				connect: users.slice(1).map((u) => ({ id: u.id })),
			},
		},
	});

	// Create Lists
	const lists = await Promise.all(
		["To Do", "In Progress", "Done"].map((title, i) =>
			prisma.list.create({
				data: {
					title,
					boardId: board.id,
					position: i,
				},
			}),
		),
	);

	// Create Cards with labels and members
	for (const list of lists) {
		for (let i = 0; i < 2; i++) {
			const card = await prisma.card.create({
				data: {
					title: faker.lorem.words(3),
					description: faker.lorem.sentence(),
					listId: list.id,
					position: i,
					members: {
						connect: [{ id: users[1].id }],
					},
				},
			});

			await prisma.label.create({
				data: {
					name: faker.word.noun(),
					color: faker.color.rgb(),
					cards: {
						connect: { id: card.id },
					},
				},
			});

			await prisma.comment.create({
				data: {
					message: faker.lorem.sentence(),
					cardId: card.id,
					authorId: users[1].id,
				},
			});
		}
	}

	// Create Meeting
	const meeting = await prisma.meeting.create({
		data: {
			title: "Sprint Planning",
			description: "Discuss sprint goals and tasks",
			startTime: faker.date.soon(),
			endTime: faker.date.soon({ days: 1 }),
			boardId: board.id,
			participants: {
				create: users.map((user) => ({
					userId: user.id,
				})),
			},
		},
	});

	console.log("✅ Database seeded.");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
