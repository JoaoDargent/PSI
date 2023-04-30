import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService} from './service/user.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ListsComponent } from './lists/lists.component';
import { LibraryComponent } from './library/library.component';
import { FollowingComponent } from './following/following.component';
import { FollowersComponent } from './followers/followers.component';
import { ItemService } from './service/item.service';
import { ItemsSearchComponent } from './items-search/items-search.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { UserLoginComponent } from './user-login/user-login.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    DashboardComponent,
    ListsComponent,
    LibraryComponent,
    FollowingComponent,
    FollowersComponent,
    ItemsSearchComponent,
    ItemDetailComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    /** The HttpClientInMemoryWebApiModule module intercepts HTTP requests
     and returns simulated server responses.
     Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )*/
  ],
  providers: [UserService, ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
