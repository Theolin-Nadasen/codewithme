CREATE TABLE "content_playlists" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"playlist_id" text NOT NULL,
	"description_id" text NOT NULL,
	"category" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "content_playlists_playlist_id_unique" UNIQUE("playlist_id")
);
