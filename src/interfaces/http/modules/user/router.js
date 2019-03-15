const { Router } = require('express')
const Status = require('http-status')

module.exports = ({
  getUseCase,
  logger,
  response: { Success, Fail }
}) => {
  const router = Router()

  /**
 * @swagger
 * definitions:
 *   user:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *   company:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *   listing:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       createdBy:
 *         type: integer
 *   application:
 *     properties:
 *       id:
 *         type: integer
 *       coverLetter:
 *         type: string
 *       userId:
 *         type: integer
 *       listing:
 *         type: object
 *         $ref: '#/definitions/listing'
 *   top-active-user:
 *     properties:
 *       id:
 *         type: integer
 *       createdAt:
 *         type: date
 *       name:
 *         type: string
 *       count:
 *         type: integer
 *       listings:
 *         type: array
 *         items:
 *           $ref: '#/definitions/listing'
 *   detail-user:
 *     properties:
 *       id:
 *         type: integer
 *       createdAt:
 *         type: date
 *       name:
 *         type: string
 *       companies:
 *         type: array
 *         items:
 *           $ref: '#/definitions/company'
 *       createdListings:
 *         type: array
 *         items:
 *           $ref: '#/definitions/listing'
 *       applications:
 *         type: array
 *         items:
 *           $ref: '#/definitions/application'
 */

  /**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a list of users or detail view of user if userId is passed as parameters.
 *     parameters:
 *       - in: "query"
 *         name: "userId"
 *         description: "User Id to filter result"
 *         type: integer
 *         format: "int64"
 *       - in: "query"
 *         name: "page"
 *         description: "Pagination default 0"
 *         type: integer
 *         format: "int64"
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/detail-user'
 *       401:
 *        $ref: '#/responses/Unauthorized'
 */
  router
    .get('/', (req, res) => {
      getUseCase
        .all({ queryParams: req.query })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  /**
 * @swagger
 * /users/topActiveUsers:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a list top active users
 *     parameters:
 *       - in: "query"
 *         name: "page"
 *         description: "Pagination default 0"
 *         type: integer
 *         format: "int64"
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/top-active-user'
 *       401:
 *        $ref: '#/responses/Unauthorized'
 */
  router
    .get('/topActiveUsers', (req, res) => {
      getUseCase
        .getTopActiveUser({ queryParams: req.query })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  return router
}
