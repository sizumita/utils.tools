CREATE TABLE `authenticators` (
	`credential_id` text PRIMARY KEY NOT NULL,
	`credential_public_key` text NOT NULL,
	`counter` integer NOT NULL,
	`credential_device_type` text NOT NULL,
	`credential_backed_up` integer NOT NULL,
	`transports` text,
	`user_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`name` text PRIMARY KEY NOT NULL
);
