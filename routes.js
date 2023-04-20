import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import EmailDetails from './apps/email/pages/EmailDetails.js'
import EmailIndex from './apps/email/pages/EmailIndex.js'
import NoteDetails from './apps/keep/pages/NoteDetails.js'
import NoteIndex from './apps/keep/pages/NoteIndex.js'

import BookIndex from './apps/book/pages/BookIndex.js'
import BookAdd from './apps/book/cmps/BookAdd.js'
import BookEdit from './apps/book/pages/BookEdit.js'
import BookDetails from './apps/book/pages/BookDetails.js'

import BookBDetails from './apps/bookB/pages/BookBDetails.js'
import BookBAdd from './apps/bookB/pages/BookBAdd.js'
import BookBEdit from './apps/bookB/pages/BookBEdit.js'
import BookBIndex from './apps/bookB/pages/BookBIndex.js'

import BooksHome from './cmps/BooksHome.js'


const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
		},
		{
			path: '/about',
			component: AboutUs,
		},
		{
			path: '/keep',
			component: NoteIndex,
			children: [
				{
					path: ':id',
					component: NoteDetails,
				},
			]
		},
		{
			path: '/keep/:id',
			component: NoteDetails,
		},
		{
			path: '/mail',
			component: EmailIndex,
			children: [
				{
					path: ':id',
					component: EmailDetails,
				},
			]
		},
		{
			path: '/books',
			component: BooksHome
		},
		{
			path: '/book',
			component: BookIndex
		},
		{
			path: '/book/:bookId',
			component: BookDetails
		},
		{
			path: '/book/edit/:bookId?',
			component: BookEdit
		},
		{
			path: '/book/add',
			component: BookAdd
		},
		{
			path: '/bookB',
			component: BookBIndex,
		},
		{
			path: '/bookB/:bookId',
			component: BookBDetails,
		},
		{
			path: '/bookB/edit/:bookId?',
			component: BookBEdit,
		},
		{
			path: '/bookB/add/',
			component: BookBAdd,
		},
		// {
		// 	path: '/mail/:id',
		// 	component: EmailDetails,
		// },
	],
}

export const router = createRouter(routerOptions)
