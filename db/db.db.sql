BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Drums" (
	"ID_Drums"	TEXT NOT NULL,
	"FolderPath"	TEXT NOT NULL,
	PRIMARY KEY("ID_Drums")
);
CREATE TABLE IF NOT EXISTS "Harmony" (
	"ID_Harmony"	TEXT NOT NULL,
	"FolderPath"	TEXT NOT NULL,
	PRIMARY KEY("ID_Harmony")
);
CREATE TABLE IF NOT EXISTS "Beat" (
	"ID_Beat"	INTEGER NOT NULL,
	"ID_Drums"	TEXT NOT NULL,
	"ID_Harmony"	TEXT NOT NULL,
	"Valence"	REAL NOT NULL,
	"Energy"	REAL NOT NULL,
	"Mode"	INTEGER NOT NULL,
	"Danceability"	REAL NOT NULL,
	PRIMARY KEY("ID_Beat" AUTOINCREMENT),
	FOREIGN KEY("ID_Drums") REFERENCES "Drums"("ID_Drums"),
	FOREIGN KEY("ID_Harmony") REFERENCES "Harmony"("ID_Harmony")
);
INSERT INTO "Drums" VALUES ('A','BeatA');
INSERT INTO "Drums" VALUES ('B','BeatB');
INSERT INTO "Drums" VALUES ('C','BeatC');
INSERT INTO "Drums" VALUES ('D','BeatD');
INSERT INTO "Drums" VALUES ('E','BeatE');
INSERT INTO "Drums" VALUES ('F','BeatF');
INSERT INTO "Drums" VALUES ('G','BeatG');
INSERT INTO "Drums" VALUES ('H','BeatH');
INSERT INTO "Drums" VALUES ('I','BeatI');
INSERT INTO "Drums" VALUES ('J','BeatJ');
INSERT INTO "Harmony" VALUES ('A','BeatA');
INSERT INTO "Harmony" VALUES ('B','BeatB');
INSERT INTO "Harmony" VALUES ('C','BeatC');
INSERT INTO "Harmony" VALUES ('D','BeatD');
INSERT INTO "Harmony" VALUES ('E','BeatE');
INSERT INTO "Harmony" VALUES ('F','BeatF');
INSERT INTO "Harmony" VALUES ('G','BeatG');
INSERT INTO "Harmony" VALUES ('H','BeatH');
INSERT INTO "Harmony" VALUES ('I','BeatI');
INSERT INTO "Harmony" VALUES ('J','BeatJ');
COMMIT;
