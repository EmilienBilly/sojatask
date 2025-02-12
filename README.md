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

#### Relations

- Les utilisateurs peuvent avoir plusieurs contacts et profils
- Les utilisateurs peuvent appartenir à plusieurs espaces de travail avec des rôles différents
- Les rôles définissent les permissions des utilisateurs dans les espaces de travail
- Les espaces de travail contiennent plusieurs tableaux
- Les tableaux contiennent plusieurs colonnes
- Les colonnes contiennent plusieurs tâches
- Les tâches peuvent avoir des sous-tâches (relation auto-référentielle)
