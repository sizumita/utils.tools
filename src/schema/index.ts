import { integer, sqliteTable, text, int } from 'drizzle-orm/sqlite-core';
import type { AuthenticatorTransportFuture, CredentialDeviceType } from '@simplewebauthn/types';
import {relations} from "drizzle-orm";



export const users = sqliteTable('users', {
    id: text('name').primaryKey().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
    authenticators: many(authenticators),
}));

export const authenticators = sqliteTable("authenticators", {
    credentialId: text("credential_id").primaryKey(),
    credentialPublicKey: text("credential_public_key").notNull(),
    counter: int("counter", {mode: "number"}).notNull(),
    credentialDeviceType: text("credential_device_type").$type<CredentialDeviceType>().notNull(),
    credentialBackedUp: integer("credential_backed_up", { mode: 'boolean' }).notNull(),
    transports: text("transports", {mode: "json"}).$type<AuthenticatorTransportFuture[]>(),
    userId: text("user_id").notNull()
})

export const authenticatorsRelations = relations(authenticators, ({ one }) => ({
    author: one(users, {
        fields: [authenticators.userId],
        references: [users.id],
    }),
}));
