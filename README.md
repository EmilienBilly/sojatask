# SojaTask

SojaTask est une application de gestion de tâches collaborative inspirée de Trello. Elle permet aux équipes de :

- Organiser leurs tâches en tableaux et colonnes
- Suivre l'avancement des tâches avec des dates de début et d'échéance
- Collaborer au sein d'espaces de travail partagés
- Gérer les permissions des membres via un système de rôles

L'application est construite avec AdonisJS et React, utilisant Inertia.js pour créer une expérience monopage fluide.

## Schéma de Base de Données

```mermaid
erDiagram
USERS {
int id PK
string username
string password
}
CONTACTS {
int id PK
string firstname
string lastname
string email
int user_id FK
}
PROFILES {
int id PK
string name
}
PROFILES_USERS {
int profile_id PK,FK
int user_id PK,FK
}
ROLES {
int id PK
string name
string description
}
WORKSPACE_USERS {
int workspace_id PK,FK
int user_id PK,FK
int role_id FK
}
TASK_WORKSPACES {
int id PK
string title
string description
int created_by FK
}
TASK_BOARDS {
int id PK
string title
string description
int workspace_id FK
}
TASK_COLUMNS {
int id PK
string title
int board_id FK
int order
int workspace_id FK
}
TASK_TASKS {
int id PK
string title
string description
datetime created_at
datetime updated_at
datetime due_date
datetime start_date
int archived
int created_by FK
int column_id FK
int order
int parent_id FK
int completed
datetime completed_at
int workspace_id FK
}
USERS ||--o{ CONTACTS : has
USERS ||--o{ PROFILES_USERS : has
PROFILES ||--o{ PROFILES_USERS : has
USERS ||--o{ WORKSPACE_USERS : belongs_to
ROLES ||--o{ WORKSPACE_USERS : defines
TASK_WORKSPACES ||--o{ WORKSPACE_USERS : has
TASK_WORKSPACES ||--o{ TASK_BOARDS : contains
TASK_BOARDS ||--o{ TASK_COLUMNS : contains
TASK_COLUMNS ||--o{ TASK_TASKS : contains
TASK_TASKS ||--o{ TASK_TASKS : has_subtasks
```

### Description du Schéma

#### Gestion des Utilisateurs

- **USERS**: Comptes utilisateurs principaux avec détails d'authentification
- **CONTACTS**: Informations de contact associées aux utilisateurs
- **PROFILES**: Profils de rôles/permissions
- **PROFILES_USERS**: Table de jonction pour les associations utilisateurs-profils
- **ROLES**: Définition des rôles possibles dans les espaces de travail (ex: admin, membre, invité)
- **WORKSPACE_USERS**: Table de jonction pour associer les utilisateurs aux espaces de travail avec leur rôle

#### Gestion des Espaces de Travail

- **TASK_WORKSPACES**: Représente les espaces de travail où les utilisateurs collaborent.
- **TASK_BOARDS**: Contient plusieurs tableaux associés à un espace de travail.
- **TASK_COLUMNS**: Contient plusieurs colonnes dans chaque tableau, avec un ordre défini.
- **TASK_TASKS**: Contient les tâches, qui peuvent avoir des sous-tâches et sont associées à des colonnes.

#### Relations

- Les utilisateurs peuvent avoir plusieurs contacts et profils.
- Les utilisateurs peuvent appartenir à plusieurs espaces de travail avec des rôles différents.
- Les rôles définissent les permissions des utilisateurs dans les espaces de travail.
- Les espaces de travail contiennent plusieurs tableaux.
- Les tableaux contiennent plusieurs colonnes.
- Les colonnes contiennent plusieurs tâches.
- Les tâches peuvent avoir des sous-tâches (relation auto-référentielle).

### Multi-Tenancy

L'application utilise une architecture multi-locataire (multi-tenancy) pour permettre à plusieurs organisations d'utiliser la même instance de la base de données tout en maintenant leurs données séparées. Chaque table qui stocke des données liées aux tâches, colonnes et tableaux inclut un champ `workspace_id`. Cela permet de filtrer et de gérer les données en fonction de l'espace de travail, garantissant que les utilisateurs n'accèdent qu'à leurs propres données.

- **Exemple**: Lorsqu'une tâche est créée, elle est associée à un `workspace_id`, ce qui permet de s'assurer que seuls les utilisateurs de cet espace de travail peuvent voir et interagir avec cette tâche.

### Utilisation du Mixin `WithWorkspace`

Pour simplifier la gestion des relations avec les espaces de travail, nous avons créé un mixin appelé `WithWorkspace`. Ce mixin est utilisé dans les modèles `Board`, `Column` et `Task` pour ajouter automatiquement le champ `workspaceId` et la relation `belongsTo` avec le modèle `Workspace`.

- **Avantages**:
  - **Réduction de la Redondance**: En utilisant le mixin, nous évitons de répéter le code pour chaque modèle.
  - **Clarté**: Les modèles restent clairs et concis, tout en maintenant la logique de relation nécessaire.

### Convention de Nommage des Tables

Pour différencier les tables créées et liées à SojaTask des autres tables dans la base de données, un préfixe `task_` est utilisé. Cela permet de s'assurer que les tables de SojaTask ne se mélangent pas avec celles d'autres applications utilisant la même base de données.

---
