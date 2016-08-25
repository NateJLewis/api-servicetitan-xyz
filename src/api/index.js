/**
 * The contents of this file is free and unencumbered software released into the
 * public domain. For more information, please refer to <http://unlicense.org/>
 *
 * @author Maxmillion McLaughlin <npm@maxmclau.com>
 */

'use strict'

import { Router } from 'express'
import debug from 'debug'
import Srvcttn from 'srvcttn'
import expressQueue from 'express-queue'
import randomString from 'randomstring'

const seed = process.env.SEED || randomString.generate()

let log = debug('api-servicetitan-xyz')
let queue = expressQueue({ activeLimit: process.env.LIMIT || 1 })

export default () => {
	let router = Router()

	router.use((req, res, next) => {
		log(`${req.method} @ api ${req.path}`)
		next()
	})

	router.route('/jobs/:id/tag')
		.post(queue, (req, res) => {
			let srvcttn = new Srvcttn(seed)

			srvcttn
			.login(req.headers['x-http-servicetitan-username'], req.headers['x-http-servicetitan-password'])
				.then(() => {
					srvcttn.job(req.params.id)
					.addTag(req.body.data.tag)
						.then(() => {
							srvcttn.kill()
							log(`tag ${req.body.data.tag} added to job ${req.params.id}`)
							res.sendStatus(200)
						})
						.catch(() => res.sendStatus(500))
				})
				.catch(() => res.sendStatus(500))
		})

	router.all('*', (req, res) => {
		res.redirect(307, `https://api.servicetitan.com/v1${req.path}`)
		log(`307 @ api.servicetitan.com ${req.path} complete`)
	})

	return router
}
