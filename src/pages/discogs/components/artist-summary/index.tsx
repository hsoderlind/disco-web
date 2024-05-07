import { Button, Card } from 'antd';
import { ArtistSummaryProps } from './types';
import Link from '../../../../components/navigation/Link';

export const ArtistSummary = ({ artists }: ArtistSummaryProps) => {
	return (
		<>
			{artists.map((artist, index) => (
				<Card
					key={`artist-${index}`}
					className='mb-4'
					title='Artist/Grupp'
					cover={artist.thumbnail_url ? <img src={artist.thumbnail_url} alt={artist.name} /> : undefined}>
					<Card.Meta
						title={artist.name}
						// description={
						// 	<Link to={`../artist/${artist.id}`} title={artist.name}>
						// 		Se mer från {artist.name}
						// 	</Link>
						// }
					/>
				</Card>
			))}
		</>
	);
};
