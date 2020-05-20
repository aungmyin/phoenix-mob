import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./index/index.module').then(m => m.IndexPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./pages/changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  {
    path: 'workreport',
    loadChildren: () => import('./pages/workreport/workreport.module').then( m => m.WorkreportPageModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./pages/client/client.module').then( m => m.ClientPageModule)
  },
  {
    path: 'workreportdetail',
    loadChildren: () => import('./pages/workreportdetail/workreportdetail.module').then( m => m.WorkreportdetailPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
