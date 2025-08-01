import { Component, signal } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { LockeService } from '../../../core/services/locke-service';

@Component({
  selector: 'app-locke',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  template: `<main class="h-screen font-text ">
    <section class="flex flex-col gap-5 h-full">
      <div class="grid-container">
        <div
          class="fixed top-0 z-50 lg:relative lg:mt-8 mt-0 nav-locke h-fit lg:h-full font-title border border-slate-300 border-x-0 border-y-0 border-e-2 "
        >
          <div
            class="bg-white border border-slate-300 lg:border-0  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-5 "
          >
            <a
              routerLink="/lockes"
              class="group flex justify-center-safe gradient "
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-12 group-hover:scale-125 transition-all ease-in "
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20 11v2H8v2H6v-2H4v-2h2V9h2v2zM10 7H8v2h2zm0 0h2V5h-2zm0 10H8v-2h2zm0 0h2v2h-2z"
                /></svg
            ></a>
            <a
              [routerLink]="['/locke', testId]"
              [routerLinkActive]="'outline outline-slate-300 rounded-xl'"
              [routerLinkActiveOptions]="{ exact: true }"
              class="lg:w-full"
            >
              <div
                class="link hover:outline hover:outline-slate-300 rounded-xl hover:shadow text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-8 gradient"
                  viewBox="0 0 24 24"
                >
                  <rect width="24" height="24" fill="none" />
                  <path
                    fill="currentColor"
                    d="M14 2h-4v2H8v2H6v2H4v2H2v2h2v10h7v-6h2v6h7V12h2v-2h-2V8h-2V6h-2V4h-2zm0 2v2h2v2h2v2h2v2h-2v8h-3v-6H9v6H6v-8H4v-2h2V8h2V6h2V4z"
                  />
                </svg>
                <span class="gradient">General</span>
              </div>
            </a>

            <a
              [routerLink]="['/locke', testId, 'rules']"
              routerLinkActive="outline outline-slate-300 rounded-xl"
            >
              <div
                class="link hover:outline hover:outline-slate-300 rounded-xl hover:shadow text-sm "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-8 gradient"
                  viewBox="0 0 24 24"
                >
                  <rect width="24" height="24" fill="none" />
                  <path
                    fill="currentColor"
                    d="M7 0h16v20H5V0zm14 18V2H7v16zM9 4h10v2H9zm10 4H9v2h10zM9 12h7v2H9zm10 10H3V4H1v20h18z"
                  />
                </svg>
                <span class="gradient">Rules</span>
              </div>
            </a>

            <a
              [routerLink]="['/locke', testId, 'tournaments']"
              routerLinkActive="outline outline-slate-300 rounded-xl"
            >
              <div
                class="link hover:outline hover:outline-slate-300 rounded-xl hover:shadow text-sm  "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-8 gradient"
                  viewBox="0 0 24 24"
                >
                  <rect width="24" height="24" fill="none" />
                  <path
                    fill="currentColor"
                    d="M9 2H2v2h5v4H2v2h7V7h5v10H9v-3H2v2h5v4H2v2h7v-3h7v-6h6v-2h-6V5H9z"
                  />
                </svg>
                <span class="gradient">Tournaments</span>
              </div>
            </a>
          </div>
        </div>
        <div class="mt-12 lg:mt-0 content">
          <router-outlet [routerOutletData]="testId" />
        </div>
      </div>
    </section>
  </main> `,
  styles: [
    `
      .grid-container {
        display: grid;
        width: 100%;
        height: 100%;
        gap: 10px;
        grid-template-columns: 0.2fr 0.8fr;
        grid-row: auto;
        @media (max-width: 1024px) {
          grid-template-columns: 1fr;
        }
      }
      .nav-locke {
        padding: 10px;
        animation: appear 0.5s linear;

        width: 100%;

        div {
          width: 100%;
        }

        .link {
          padding: 5px 20px;
          display: flex;
          flex-direction: row;
          gap: 10px;

          align-items: center;
          height: 50px;
          color: oklch(27.8% 0.033 256.848);
          font-weight: bold;
          a {
            width: fit-content;
          }
        }
      }

      .content {
        width: 100%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      @keyframes appear {
        from {
          width: 50%;
          opacity: 0;
        }
        to {
          width: 100%;
          opacity: 1;
        }
      }
      @keyframes appear2 {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `,
  ],
})
export class Locke {
  testId: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.testId = params['id']; // Access the 'id' parameter from the URL
    });
  }
}
