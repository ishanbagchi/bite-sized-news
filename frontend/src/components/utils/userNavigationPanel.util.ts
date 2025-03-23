import * as routesConstants from '../../common/constants/routes.constants'
import * as navbarConstants from '../../common/constants/navbar.constants'

interface UserNavigationListModel {
	link: string
	text: string
	image?: string
	linkClass?: string
}

export const getUserNavigationList = (
	username: string,
): UserNavigationListModel[] => [
	{
		link: routesConstants.EDITOR_ROUTE,
		text: navbarConstants.WRITE_BUTTON_TEXT,
		image: 'fi fi-rr-pen-clip',
		linkClass: 'flex gap-2  md:hidden',
	},
	{
		link: routesConstants.GET_PROFILE_ROUTE(username),
		text: navbarConstants.PROFILE_BUTTON_TEXT,
	},
	{
		link: routesConstants.DASHBOARD_ROUTE,
		text: navbarConstants.DASHBOARD_BUTTON_TEXT,
	},
	{
		link: routesConstants.PROFILE_SETTINGS_ROUTE,
		text: navbarConstants.PROFILE_SETTINGS_BUTTON_TEXT,
	},
]
