import { queryEnhancer } from './enhancers/query';
import { DetailRow } from '../../components/SongList';

const EnhancedDetailRow = queryEnhancer(DetailRow);

export default EnhancedDetailRow;
