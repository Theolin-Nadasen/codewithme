CREATE TABLE "challenges" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"difficulty" text NOT NULL,
	"language" text NOT NULL,
	"starter_code" text NOT NULL,
	"solution_code" text NOT NULL,
	"test_code" text NOT NULL,
	"expected_output" text NOT NULL,
	"pro_only" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_completed_challenges" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"challenge_id" text NOT NULL,
	"completed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "mobile_token" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "subscription_reference" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "subscription_plan" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "subscription_status" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "subscription_expires_at" timestamp;--> statement-breakpoint
ALTER TABLE "user_completed_challenges" ADD CONSTRAINT "user_completed_challenges_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_completed_challenges" ADD CONSTRAINT "user_completed_challenges_challenge_id_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "public"."challenges"("id") ON DELETE cascade ON UPDATE no action;