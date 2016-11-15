import ChoresController from './controllers/ChoresController';
import UserController from './controllers/UserController';
import ChildrenController from './controllers/ChildrenController';
import ScheduleController from './controllers/ScheduleController';

const routes = (app) => {
  /* /////// DOCS /////// */
  app.get('/', (req, res) => res.render('index', { title: 'my-nanny docs' }));

  /* /////// AUTH /////// */

  /**
  * @api {post} /login Login
  * @apiGroup Auth
  *
  * @apiParamExample POST format:
  *     {
  *       "account": {
  *         "amazonId": "999888777666"
  *       }
  *     }
  *
  * @apiSuccessExample Success-Response:
  *
  *     {
  *       "account": {
  *         "amazonId": "999888777666"
  *       },
  *       "children": [
  *         {
  *           "name": "Winston",
  *           "chores": [
  *             {
  *               "title": "Clean your room",
  *               "details": "Please clean your room nice and neat. Vaccuum it too!",
  *               "date": "2016-12-24",
  *               "completed": false
  *             },
  *             {
  *               "title": "Wash the dishes",
  *               "details": "Use the blue sponge under the sink.",
  *               "date": "2016-12-24",
  *               "completed": true
  *             }
  *           ],
  *           "checkedIn": false,
  *           "schedule": {
  *             "defaultCurfews": [null, "18:30", "14:30", "17:00", "22:00", "17:00", null],
  *             "dateOfLastCurfew": "2016-11-14"
  *           }
  *         },
  *         {
  *           "name": "Wendy",
  *           "chores": [
  *             {
  *               "title": "Clean your room",
  *               "details": "Please clean your room nice and neat. Vaccuum it too!",
  *               "date": "2016-12-24"
  *               "completed": true
  *             },
  *             {
  *               "title": "Wash the dishes",
  *               "details": "Use the blue sponge under the sink.",
  *               "date": "2016-12-24",
  *               "completed": false
  *             }
  *           ],
  *           "checkedIn": true,
  *           "schedule": {
  *             "defaultCurfews": [null, "18:30", "14:30", "17:00", "22:00", "17:00", null],
  *             "dateOfLastCurfew": "2016-11-13"
  *           }
  *         }
  *       ]
  *     }
  *
  * @apiError Failed to log in.
  */
  app.post('/login', UserController.login);

  /**
  * @api {post} /logout Logout
  * @apiGroup Auth
  *
  *
  * @apiSuccess {String} Successfully logged out.
  *
  * @apiError Failed to log out.
  */
  app.post('/logout', UserController.logout);

  /**
  * @api {post} /signup Signup
  * @apiGroup Auth
  *
  * @apiParamExample POST format:
  *     {
  *       "account": {
  *         "token": "1234",
  *         "username": "Mary",
  *         "amazonId": "999888777666",
  *         "timeZone": "EST",
  *         "phone": "1234567890",
  *         "email": "mary@example.com"
  *       }
  *     }
  *
  * @apiSuccess {String} Account successfully created.
  *
  * @apiError Failed to create account.
  */
  app.post('/signup', UserController.signup);

  /* /////// ACCOUNT /////// */

  /**
  * @api {put} /api/account Update Account
  * @apiGroup Account
  *
  * @apiParamExample PUT format:
  *     {
  *       "account": {
  *         "amazonId": "999888777666"
  *       },
  *       "updatedAccount": {
  *         "username": "Mary",
  *         "timeZone": "EST",
  *         "phone": "9990009999",
  *         "email": "mary@anotherExample.com"
  *       }
  *     }
  *
  * @apiSuccess {String} Successfully updated account.
  *
  * @apiError Failed to update account.
  */
  app.put('/api/account', UserController.updateAccount);

  /* /////// CHILDREN /////// */

  /**
  * @api {post} /api/children Add Child to Account
  * @apiGroup Children
  *
  * @apiParamExample POST format:
  *     {
  *       "account": {
  *         "amazonId": "999888777666"
  *       },
  *       "child": {
  *         "name": "Winston",
  *         "phone": "8887776666"
  *       }
  *     }
  *
  * @apiSuccess {String} Successfully added child.
  *
  * @apiError Failed to add child.
  */
  app.post('/api/children', ChildrenController.addChild);

  /**
  * @api {put} /api/children Update a child
  * @apiGroup Children
  *
  * @apiParamExample PUT format:
  *     {
  *       "account": {
  *         "amazonId": "999888777666"
  *       },
  *       "child": {
  *         "name": "Winston"
  *       },
  *       "updatedChild": {
  *         "name": "Oliver",
  *         "phone": "2223334444"
  *       }
  *     }
  *
  * @apiSuccess {String} Successfully updated child.
  *
  * @apiError Failed to update child.
  */
  app.put('/api/children', ChildrenController.updateChild);

  /* /////// CHORES /////// */

  /**
  * @api {get} /api/chores Get all chores for a child
  * @apiGroup Chores
  *
  */
  app.get('/api/chores', ChoresController.readAll);

  /**
  * @api {get} /api/chores/:id Get a specific chore?
  * @apiGroup Chores
  *
  */
  app.get('/api/chores/:id', ChoresController.read);

  /**
  * @api {post} /api/chores Add Chores to a Child
  * @apiGroup Chores
  *
  * @apiParamExample POST format:
  *     {
  *       "account": {
  *         "amazonId": "999888777666"
  *       },
  *       "child": {
  *         "name": "Winston"
  *       },
  *       "chores": [
  *         { "title": "Clean your room",
  *           "details": "Please clean your room nice and neat. Vaccuum it too!",
  *           "date": "2016-12-24"
  *         },
  *         { "title": "Wash the dishes",
  *           "details": "Use the blue sponge under the sink.",
  *           "date": "2016-12-24"
  *         }
  *        ]
  *     }
  *
  * @apiSuccess {String} Successfully added chore.
  *
  * @apiError Failed to add chore.
  */
  app.post('/api/chores', ChoresController.create);

  /**
  * @api {post} /api/chores Add Chore to a Child
  * @apiGroup Chores
  */
  app.put('/api/chores', ChoresController.update);

  /**
  * @api {post} /api/chores Add Chore to a Child
  * @apiGroup Chores
  */
  app.delete('/api/chores/:id', ChoresController.destroy);


  /* /////// Schedule /////// */

  /**
  * @api {get} /api/schedule Get schedule for a child
  * @apiGroup Schedule
  */
  app.get('/api/schedule', ScheduleController.read);

  /**
  * @api {post} /api/schedule Create schedule for a child
  * @apiGroup Schedule
  *
  * @apiParamExample POST format:
  *     {
  *       "account": {
  *         "amazonId": "999888777666"
  *       },
  *       "child": {
  *         "name": "Winston"
  *       },
  *       "schedule": {
  *             "defaultCurfews": [null, "18:30", "14:30", "17:00", "22:00", "17:00", null]
  *       }
  *     }
  *
  * @apiSuccess {String} Successfully added chore.
  *
  * @apiError Failed to add chore.
  */
  app.post('/api/schedule', ScheduleController.create);

  /**
  * @api {put} /api/schedule Update schedule for a child
  * @apiGroup Schedule
  */
  app.put('/api/schedule', ScheduleController.update);

  /**
  * @api {delete} /api/schedule Delete schedule for a child
  * @apiGroup Schedule
  */
  app.delete('/api/schedule', ScheduleController.destroy);
};

export default routes;
