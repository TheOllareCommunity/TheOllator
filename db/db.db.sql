BEGIN TRANSACTION;
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
CREATE TABLE IF NOT EXISTS "Harmony" (
	"ID_Harmony"	TEXT NOT NULL,
	"FolderPath"	TEXT NOT NULL,
	"Melody_Preset"	INTEGER,
	"Harmony_Preset"	INTEGER,
	"Bass_Preset"	INTEGER,
	PRIMARY KEY("ID_Harmony")
);
CREATE TABLE IF NOT EXISTS "Drums" (
	"ID_Drums"	TEXT NOT NULL,
	"FolderPath"	TEXT NOT NULL,
	"Snare_Preset"	INTEGER,
	"Kick_Preset"	INTEGER,
	"HH_Preset"	INTEGER,
	PRIMARY KEY("ID_Drums")
);
INSERT INTO "Beat" VALUES (302,'A','A',0.758,0.294,1,0.7);
INSERT INTO "Beat" VALUES (303,'A','B',0.0636,0.362,0,0.6);
INSERT INTO "Beat" VALUES (304,'A','C',0.721,0.141,0,0.727);
INSERT INTO "Beat" VALUES (305,'A','D',0.359,0.277,1,0.674);
INSERT INTO "Beat" VALUES (306,'A','E',0.478,0.317,1,0.665);
INSERT INTO "Beat" VALUES (307,'A','F',0.774,0.338,1,0.646);
INSERT INTO "Beat" VALUES (308,'A','G',0.717,0.312,1,0.857);
INSERT INTO "Beat" VALUES (309,'A','H',0.704,0.197,1,0.786);
INSERT INTO "Beat" VALUES (310,'A','I',0.438,0.266,0,0.829);
INSERT INTO "Beat" VALUES (311,'A','J',0.882,0.158,1,0.804);
INSERT INTO "Beat" VALUES (312,'B','A',0.695,0.394,1,0.619);
INSERT INTO "Beat" VALUES (313,'B','B',0.145,0.499,0,0.593);
INSERT INTO "Beat" VALUES (314,'B','C',0.59,0.316,0,0.456);
INSERT INTO "Beat" VALUES (315,'B','D',0.7,0.332,1,0.655);
INSERT INTO "Beat" VALUES (316,'B','E',0.324,0.386,1,0.462);
INSERT INTO "Beat" VALUES (317,'B','F',0.605,0.402,0,0.66);
INSERT INTO "Beat" VALUES (318,'B','G',0.564,0.439,1,0.743);
INSERT INTO "Beat" VALUES (319,'B','H',0.401,0.377,1,0.744);
INSERT INTO "Beat" VALUES (320,'B','I',0.601,0.33,0,0.784);
INSERT INTO "Beat" VALUES (321,'B','J',0.66,0.256,1,0.782);
INSERT INTO "Beat" VALUES (322,'C','A',0.513,0.359,1,0.783);
INSERT INTO "Beat" VALUES (323,'C','B',0.0663,0.461,0,0.608);
INSERT INTO "Beat" VALUES (324,'C','C',0.446,0.651,0,0.902);
INSERT INTO "Beat" VALUES (325,'C','D',0.272,0.439,0,0.715);
INSERT INTO "Beat" VALUES (326,'C','E',0.328,0.577,0,0.483);
INSERT INTO "Beat" VALUES (327,'C','F',0.615,0.359,1,0.686);
INSERT INTO "Beat" VALUES (328,'C','G',0.449,0.458,0,0.835);
INSERT INTO "Beat" VALUES (329,'C','H',0.199,0.581,0,0.802);
INSERT INTO "Beat" VALUES (330,'C','I',0.59,0.334,0,0.844);
INSERT INTO "Beat" VALUES (331,'C','J',0.416,0.395,1,0.843);
INSERT INTO "Beat" VALUES (332,'D','A',0.712,0.584,1,0.752);
INSERT INTO "Beat" VALUES (333,'D','B',0.0537,0.45,0,0.653);
INSERT INTO "Beat" VALUES (334,'D','C',0.826,0.499,0,0.599);
INSERT INTO "Beat" VALUES (335,'D','D',0.202,0.37,1,0.663);
INSERT INTO "Beat" VALUES (336,'D','E',0.335,0.462,1,0.761);
INSERT INTO "Beat" VALUES (337,'D','F',0.721,0.362,1,0.724);
INSERT INTO "Beat" VALUES (338,'D','G',0.865,0.307,1,0.85);
INSERT INTO "Beat" VALUES (339,'D','H',0.809,0.392,1,0.788);
INSERT INTO "Beat" VALUES (340,'D','I',0.628,0.395,0,0.81);
INSERT INTO "Beat" VALUES (341,'D','J',0.508,0.282,1,0.786);
INSERT INTO "Beat" VALUES (342,'E','A',0.673,0.376,1,0.811);
INSERT INTO "Beat" VALUES (343,'E','B',0.0542,0.4,0,0.672);
INSERT INTO "Beat" VALUES (344,'E','C',0.41,0.397,0,0.79);
INSERT INTO "Beat" VALUES (345,'E','D',0.203,0.291,1,0.692);
INSERT INTO "Beat" VALUES (346,'E','E',0.185,0.368,0,0.577);
INSERT INTO "Beat" VALUES (347,'E','F',0.548,0.377,1,0.663);
INSERT INTO "Beat" VALUES (348,'E','G',0.924,0.28,0,0.847);
INSERT INTO "Beat" VALUES (349,'E','H',0.237,0.46,0,0.802);
INSERT INTO "Beat" VALUES (350,'E','I',0.483,0.297,0,0.816);
INSERT INTO "Beat" VALUES (351,'E','J',0.435,0.259,1,0.809);
INSERT INTO "Beat" VALUES (352,'F','A',0.977,0.816,1,0.736);
INSERT INTO "Beat" VALUES (353,'F','B',0.439,0.676,0,0.76);
INSERT INTO "Beat" VALUES (354,'F','C',0.995,0.95,0,0.858);
INSERT INTO "Beat" VALUES (355,'F','D',0.643,0.582,0,0.79);
INSERT INTO "Beat" VALUES (356,'F','E',0.783,0.711,0,0.824);
INSERT INTO "Beat" VALUES (357,'F','F',0.964,0.708,1,0.806);
INSERT INTO "Beat" VALUES (358,'F','G',0.889,0.712,1,0.888);
INSERT INTO "Beat" VALUES (359,'F','H',0.964,0.802,0,0.811);
INSERT INTO "Beat" VALUES (360,'F','I',0.973,0.858,0,0.647);
INSERT INTO "Beat" VALUES (361,'F','J',0.854,0.723,1,0.822);
INSERT INTO "Beat" VALUES (362,'G','A',0.291,0.722,1,0.78);
INSERT INTO "Beat" VALUES (363,'G','B',0.196,0.685,1,0.756);
INSERT INTO "Beat" VALUES (364,'G','C',0.414,0.917,0,0.701);
INSERT INTO "Beat" VALUES (365,'G','D',0.297,0.385,0,0.763);
INSERT INTO "Beat" VALUES (366,'G','E',0.245,0.699,1,0.76);
INSERT INTO "Beat" VALUES (367,'G','F',0.662,0.668,1,0.863);
INSERT INTO "Beat" VALUES (368,'G','G',0.343,0.696,1,0.781);
INSERT INTO "Beat" VALUES (369,'G','H',0.0862,0.748,1,0.697);
INSERT INTO "Beat" VALUES (370,'G','I',0.395,0.499,0,0.741);
INSERT INTO "Beat" VALUES (371,'G','J',0.44,0.537,1,0.836);
INSERT INTO "Beat" VALUES (372,'H','A',0.596,0.538,1,0.554);
INSERT INTO "Beat" VALUES (373,'H','B',0.0754,0.521,1,0.646);
INSERT INTO "Beat" VALUES (374,'H','C',0.4,0.433,0,0.721);
INSERT INTO "Beat" VALUES (375,'H','D',0.439,0.302,1,0.697);
INSERT INTO "Beat" VALUES (376,'H','E',0.203,0.562,1,0.616);
INSERT INTO "Beat" VALUES (377,'H','F',0.661,0.432,1,0.745);
INSERT INTO "Beat" VALUES (378,'H','G',0.771,0.385,1,0.732);
INSERT INTO "Beat" VALUES (379,'H','H',0.232,0.42,1,0.804);
INSERT INTO "Beat" VALUES (380,'H','I',0.586,0.367,0,0.8);
INSERT INTO "Beat" VALUES (381,'H','J',0.368,0.385,1,0.81);
INSERT INTO "Beat" VALUES (382,'I','A',0.655,0.551,1,0.727);
INSERT INTO "Beat" VALUES (383,'I','B',0.0392,0.516,0,0.646);
INSERT INTO "Beat" VALUES (384,'I','C',0.369,0.525,1,0.727);
INSERT INTO "Beat" VALUES (385,'I','D',0.328,0.422,1,0.655);
INSERT INTO "Beat" VALUES (386,'I','E',0.349,0.451,1,0.743);
INSERT INTO "Beat" VALUES (387,'I','F',0.577,0.434,1,0.705);
INSERT INTO "Beat" VALUES (388,'I','G',0.786,0.454,1,0.804);
INSERT INTO "Beat" VALUES (389,'I','H',0.277,0.562,1,0.775);
INSERT INTO "Beat" VALUES (390,'I','I',0.288,0.484,0,0.809);
INSERT INTO "Beat" VALUES (391,'I','J',0.317,0.366,1,0.809);
INSERT INTO "Beat" VALUES (392,'J','A',0.57,0.303,1,0.69);
INSERT INTO "Beat" VALUES (393,'J','B',0.251,0.283,0,0.628);
INSERT INTO "Beat" VALUES (394,'J','C',0.58,0.593,1,0.647);
INSERT INTO "Beat" VALUES (395,'J','D',0.411,0.365,1,0.641);
INSERT INTO "Beat" VALUES (396,'J','E',0.311,0.33,1,0.637);
INSERT INTO "Beat" VALUES (397,'J','F',0.839,0.32,1,0.634);
INSERT INTO "Beat" VALUES (398,'J','G',0.25,0.332,1,0.843);
INSERT INTO "Beat" VALUES (399,'J','H',0.358,0.333,1,0.803);
INSERT INTO "Beat" VALUES (400,'J','I',0.458,0.277,0,0.807);
INSERT INTO "Beat" VALUES (401,'J','J',0.266,0.183,1,0.808);
INSERT INTO "Harmony" VALUES ('A','BeatA',NULL,NULL,NULL);
INSERT INTO "Harmony" VALUES ('B','BeatB',NULL,NULL,NULL);
INSERT INTO "Harmony" VALUES ('C','BeatC',NULL,NULL,NULL);
INSERT INTO "Harmony" VALUES ('D','BeatD',NULL,NULL,NULL);
INSERT INTO "Harmony" VALUES ('E','BeatE',NULL,NULL,NULL);
INSERT INTO "Harmony" VALUES ('F','BeatF',NULL,NULL,NULL);
INSERT INTO "Harmony" VALUES ('G','BeatG',NULL,NULL,NULL);
INSERT INTO "Harmony" VALUES ('H','BeatH',NULL,NULL,NULL);
INSERT INTO "Harmony" VALUES ('I','BeatI',NULL,NULL,NULL);
INSERT INTO "Harmony" VALUES ('J','BeatJ',NULL,NULL,NULL);
INSERT INTO "Drums" VALUES ('A','BeatA',NULL,NULL,NULL);
INSERT INTO "Drums" VALUES ('B','BeatB',NULL,NULL,NULL);
INSERT INTO "Drums" VALUES ('C','BeatC',NULL,NULL,NULL);
INSERT INTO "Drums" VALUES ('D','BeatD',NULL,NULL,NULL);
INSERT INTO "Drums" VALUES ('E','BeatE',NULL,NULL,NULL);
INSERT INTO "Drums" VALUES ('F','BeatF',NULL,NULL,NULL);
INSERT INTO "Drums" VALUES ('G','BeatG',NULL,NULL,NULL);
INSERT INTO "Drums" VALUES ('H','BeatH',NULL,NULL,NULL);
INSERT INTO "Drums" VALUES ('I','BeatI',NULL,NULL,NULL);
INSERT INTO "Drums" VALUES ('J','BeatJ',NULL,NULL,NULL);
COMMIT;
