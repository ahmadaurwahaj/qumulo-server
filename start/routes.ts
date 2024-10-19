import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const MetricsController = () => import('#controllers/metrics.controller')
const SnapshotPoliciesController = () => import('#controllers/snapshot.controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('iops', [MetricsController, 'getIOPS']).use([middleware.dateRangeValidator()])

        router
          .get('through-puts', [MetricsController, 'getThroughputs'])
          .use([middleware.dateRangeValidator()])
      })
      .prefix('metrics')
    router
      .group(() => {
        router.put('add', [SnapshotPoliciesController, 'storeSnapshotPolicies'])
        router.get('get/:id', [SnapshotPoliciesController, 'getSnapshotById'])
        router.post('update/:id', [SnapshotPoliciesController, 'updateSnapshot'])
        router.delete('delete/:id', [SnapshotPoliciesController, 'deleteSnapshot'])
      })
      .prefix('snapshot-policies')
  })
  .prefix('api')
