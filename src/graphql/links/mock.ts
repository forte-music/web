import { SchemaLink } from 'apollo-link-schema';
import schema from '@forte-music/mock/schema';

const link = new SchemaLink({ schema });

export default link;
