import { ContentLayout } from '../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../components/layout/content-layout/MainContentLayout';
import RegisterShopContainer from '../components/onboarding/RegisterShopContainer';

export function Component() {
	return (
		<ContentLayout>
			<MainContentLayout>
				Dashboard
				<RegisterShopContainer />
			</MainContentLayout>
		</ContentLayout>
	);
}
