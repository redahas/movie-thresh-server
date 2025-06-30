# Movie Thresh Server

A GraphQL server built with Apollo Server 4 and Express integration, with Supabase backend.

## Features

- 🚀 Apollo Server 4 with Server Preset
- 📊 GraphQL API with queries and mutations
- 🔒 Security middleware (Helmet, CORS)
- 🎬 Movie management system
- 👥 User management system
- 🏥 Health check endpoint
- 📦 ES Modules support
- 🔐 Supabase authentication and database
- 🛡️ Row Level Security (RLS)
- ⚡ Real-time capabilities

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Supabase account
- yarn or npm

### Setup

1. **Create a Supabase project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Install dependencies**:
```bash
yarn install
```

3. **Configure environment**:
```bash
# Copy environment file
cp env.example .env

# Edit .env with your Supabase credentials
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set up database schema**:
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Run the contents of `supabase-schema.sql`

5. **Start the development server**:
```bash
yarn dev
```

The server will be available at:
- GraphQL endpoint: `http://localhost:4000/graphql`
- Health check: `http://localhost:4000/health`

## API Examples

### Queries

#### Get all movies
```graphql
query {
  movies {
    id
    title
    description
    releaseYear
    rating
    genre
    director
  }
}
```

#### Get a specific movie
```graphql
query {
  movie(id: "1") {
    id
    title
    description
    releaseYear
    rating
  }
}
```

#### Get all users
```graphql
query {
  users {
    id
    username
    email
  }
}
```

### Mutations

#### Create a new movie
```graphql
mutation {
  createMovie(input: {
    title: "Inception"
    description: "A thief who steals corporate secrets..."
    releaseYear: 2010
    rating: 8.8
    genre: "Sci-Fi"
    director: "Christopher Nolan"
  }) {
    id
    title
    description
  }
}
```

#### Update a movie
```graphql
mutation {
  updateMovie(id: "1", input: {
    rating: 9.5
  }) {
    id
    title
    rating
  }
}
```

#### Delete a movie
```graphql
mutation {
  deleteMovie(id: "1")
}
```

#### Create a new user
```graphql
mutation {
  createUser(input: {
    username: "jane_doe"
    email: "jane@example.com"
  }) {
    id
    username
    email
  }
}
```

## Project Structure

```
src/
├── index.js          # Main server file
├── schema.js         # GraphQL schema definitions
├── resolvers.js      # GraphQL resolvers
└── supabase.js       # Supabase client configuration
supabase-schema.sql   # Database schema for Supabase
```

## Configuration

The server uses the following environment variables:
- `PORT`: Server port (default: 4000)
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `NODE_ENV`: Environment (development/production)
- `JWT_SECRET`: Secret for additional JWT operations

## Development

- `yarn dev`: Start development server with hot reload
- `yarn test`: Run tests
- `yarn start`: Start production server
- `yarn format`: Format all files with Biome
- `yarn check`: Lint and fix issues with Biome

## Apollo Server 4 Features

This project uses Apollo Server 4 which includes:
- **Server Preset**: Optimized configuration for production
- **ES Modules**: Native ES module support
- **Standalone Server**: Can run independently or with Express
- **TypeScript Support**: Full TypeScript integration
- **Performance**: Improved performance and memory usage
- **Security**: Enhanced security features

## Supabase Features

This project leverages Supabase for:
- **Authentication**: Built-in user management
- **Database**: Managed PostgreSQL with real-time capabilities
- **Row Level Security**: Fine-grained access control
- **Real-time**: Live data updates
- **Dashboard**: Web-based database management

## Security

The server includes several security measures:
- Helmet.js for security headers
- CORS configuration
- Input validation
- Error handling
- Environment variable management
- Supabase Row Level Security
- JWT token validation

## Next Steps

To enhance this server, consider adding:
- File uploads with Supabase Storage
- Real-time subscriptions
- Rate limiting
- Logging and monitoring
- TypeScript migration
- Testing with Jest
- GraphQL subscriptions
- Advanced authentication flows 