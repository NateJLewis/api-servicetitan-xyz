/**
 * The contents of this file is free and unencumbered software released into the
 * public domain. For more information, please refer to <http://unlicense.org/>
 *
 * @author Maxmillion McLaughlin <npm@maxmclau.com>
 */

'use strict'

import debug from 'debug'
import yaml from 'yamljs'
import express from 'express'
import bodyParser from 'body-parser'
import expressHealthCheck from 'express-healthcheck'
import expressStatusMonitor from 'express-status-monitor'
import api from './api'

let log = debug('api-servicetitan-xyz')

let server = express()

let apiVersion = yaml.load(`${__dirname}/./../app.yaml`).api_version

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.use('/', express.static(`${__dirname}/./public`));

server.use('/_ah', expressStatusMonitor())
server.use('/_ah/health', expressHealthCheck())

server.use(`/${apiVersion}`, api())

let listener = server.listen(process.env.PORT || 8080, () => {
  log(`${listener.address().port} did start server on port`)
})

export default server;
