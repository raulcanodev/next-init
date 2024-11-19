## Todos
- [x] Magic Email Authentication
- [x] GitHub OAuth
- [ ] Add a user profile page
- [ ] Default user data when a user signs up

## Mongosh, generate dummy users for local development
```bash
for (let i = 1; i <= 30; i++) {
  db.users.insertOne({
    name: `User${i}`,
    email: `user${i}@example.com`,
    createdAt: new Date(),
  });
}
```