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
          class=" fixed top-0 z-50  lg:relative nav-locke h-fit lg:h-full font-title border-pixel w-full lg:w-[90px]"
        >
          <div
            class=" p-5 lg:p-0 flex flex-row lg:flex-col gap-5 overflow-x-scroll lg:overflow-visible"
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
              [routerLinkActive]="'border-pixel bg-white'"
              [routerLinkActiveOptions]="{ exact: true }"
              class="lg:w-full"
            >
              <div class="link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-8 gradient"
                  viewBox="0 0 32 32"
                >
                  <rect width="32" height="32" fill="none" />
                  <path
                    fill="currentColor"
                    d="M30.48 9.14h-1.53V6.09h-1.52V4.57H25.9V3.05h-3.04V1.52h-3.05V0h-7.62v1.52H9.14v1.53H6.09v1.52H4.57v1.52H3.05v3.05H1.52v3.05H0v7.62h1.52v3.05h1.53v3.04h1.52v1.53h1.52v1.52h3.05v1.53h3.05V32h7.62v-1.52h3.05v-1.53h3.04v-1.52h1.53V25.9h1.52v-3.04h1.53v-3.05H32v-7.62h-1.52ZM12.19 6.09h1.52V4.57h4.58v1.52h1.52v4.58h-1.52v1.52h-4.58v-1.52h-1.52ZM22.86 25.9h-1.53v1.53h-7.62V25.9h-1.52V15.24h1.52v-1.53h4.58v1.53h1.52v7.62h1.52v1.52h1.53Z"
                    stroke-width="1"
                    stroke="currentColor"
                  />
                </svg>
                <span class="whitespace-nowrap gradient">General</span>
              </div>
            </a>
            <a
              [routerLink]="['/locke', testId, 'teams']"
              routerLinkActive="border-pixel bg-white"
              class="lg:w-full"
            >
              <div class="link  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-8 gradient"
                  viewBox="0 0 32 32"
                >
                  <rect width="32" height="32" fill="none" />
                  <path
                    fill="currentColor"
                    d="M0 6.1v19.81h32V6.1Zm18.29 18.29H1.52V7.625h16.77Zm6.09 0h-4.57V7.625h3.05v6.09h1.52Zm6.1 0h-4.57V13.715h1.52v-6.09h3.05Z"
                    stroke-width="1"
                    stroke="currentColor"
                  />
                  <path
                    fill="currentColor"
                    d="M15.24 9.145h1.52v3.05h-1.52Zm-4.57 0h1.52v3.05h-1.52Zm-7.62 12.19h4.57v1.53H3.05Zm0-3.05h4.57v1.53H3.05Z"
                    stroke-width="1"
                    stroke="currentColor"
                  />
                </svg>
                <span class="whitespace-nowrap gradient">Teams</span>
              </div>
            </a>
            <a
              [routerLink]="['/locke', testId, 'rules']"
              routerLinkActive="border-pixel bg-white"
              class="lg:w-full"
            >
              <div class="link ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-8 gradient"
                  viewBox="0 0 32 32"
                >
                  <rect width="32" height="32" fill="none" />
                  <path
                    fill="currentColor"
                    d="M27.432 4.575h1.52v25.9h-1.52Zm-1.53-1.53h1.53v1.53h-1.53Zm-1.52-1.52h1.52v1.52h-1.52Zm1.518 6.09h-1.52V6.1h-1.52V4.575h-1.53v-1.53H3.052V32H25.9Zm-1.52 22.86H4.572v-25.9h13.71v6.09h6.1ZM4.572-.005h19.81v1.53H4.572Z"
                    stroke-width="1"
                    stroke="currentColor"
                  />
                  <path
                    fill="currentColor"
                    d="M7.622 25.905h13.71v1.52H7.622Zm0-6.1h13.71v1.53H7.622Zm0-6.09h13.71v1.52H7.622Zm0-6.1h6.09v1.53h-6.09Z"
                    stroke-width="1"
                    stroke="currentColor"
                  />
                </svg>
                <span class="whitespace-nowrap gradient">Rules</span>
              </div>
            </a>

            <a
              [routerLink]="['/locke', testId, 'tournaments']"
              routerLinkActive="border-pixel bg-white"
              class="lg:w-full"
            >
              <div class="link ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-8 gradient"
                  viewBox="0 0 32 32"
                >
                  <rect width="32" height="32" fill="none" />
                  <path
                    fill="currentColor"
                    d="M22.86 18.28v-4.57H9.14v4.57H0V32h32V18.28ZM9.14 30.47H1.53V19.81h7.61Zm12.19 0H10.67V15.24h10.66Zm9.15 0h-7.62V19.81h7.62Z"
                    stroke-width="1"
                    stroke="currentColor"
                  />
                  <path
                    fill="currentColor"
                    d="M28.95 21.33h-4.57v1.53h3.05v1.52h-3.05v1.52h3.05v1.53h-3.05v1.52h4.57zM25.91 6.09h3.04v1.53h-3.04ZM24.38 0h1.53v1.52h-1.53Zm-1.52 1.52h1.52v1.53h-1.52Zm-4.57 21.34h-1.53v-6.1h-3.04v1.52h1.52v4.58h-1.52v1.52h4.57zM15.24 0h1.52v3.05h-1.52Zm-6.1 4.57v6.09h1.53v1.53h10.66v-1.53h1.53V4.57h-1.53v1.52h-1.52v1.53h-1.52V6.09h-1.53V4.57h-1.52v1.52h-1.52v1.53h-1.53V6.09h-1.52V4.57Zm9.15 4.57h1.52v1.52h-1.52Zm-3.05 0h1.52v1.52h-1.52Zm-3.05 0h1.53v1.52h-1.53ZM7.62 1.52h1.52v1.53H7.62ZM6.1 0h1.52v1.52H6.1Zm1.52 27.43H4.57V25.9h3.05v-4.57H3.05v1.53H6.1v1.52H3.05v4.57h4.57zM3.05 6.09H6.1v1.53H3.05Z"
                    stroke-width="1"
                    stroke="currentColor"
                  />
                </svg>
                <span class="whitespace-nowrap gradient">Tournaments</span>
              </div>
            </a>
          </div>
        </div>
        <div class="content">
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
        grid-template-columns: auto 1fr;
        grid-row: auto;
        @media (max-width: 1024px) {
          grid-template-columns: 1fr;
        }
      }
      .nav-locke {
        padding: 10px;
        overflow: hidden;
        background: var(--color-amber-400);
        animation: appear 0.5s ease-in-out;
        transition: width 0.5s ease;
        @media (min-width: 1024px) {
          &:hover {
            width: 300px;
          }
        }
        div {
          width: 100%;
        }

        .link {
          overflow: hidden;
          padding: 5px 20px;
          display: flex;
          flex-direction: row;
          gap: 30px;
          transition: all 0.2s ease-in-out;

          align-items: center;
          height: 50px;
          color: oklch(27.8% 0.033 256.848);
          font-weight: bold;
          &:hover {
            background: white;
            box-shadow: 0px 5px black, 0px -5px black, 5px 0px black,
              -5px 0px black, 0px 10px #00000038, 5px 5px #00000038,
              -5px 5px #00000038, inset 0px 5px #ffffff36;
          }
          a {
            width: fit-content;
          }
          svg {
            flex-shrink: 0;
          }
        }
      }

      .content {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      @keyframes appear {
        from {
          width: 10px;
          opacity: 0;
        }
        to {
          width: 90px;
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
