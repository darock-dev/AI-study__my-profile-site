// 포트폴리오 데이터
// 실제 프로젝트 정보로 바꾸려면 아래 배열만 수정하세요.
const projects = [
  {
    title: '반응형 랜딩 페이지',
    description: '모바일 우선으로 설계한 제품 소개 랜딩 페이지입니다.',
    tags: ['HTML', 'CSS', 'Tailwind CSS'],
    link: '#',
  },
  {
    title: '관리자 대시보드 UI',
    description: '차트와 테이블 중심의 관리자 화면을 퍼블리싱했습니다.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '#',
  },
  {
    title: '이커머스 상품 상세',
    description: '이미지 슬라이더와 옵션 선택 UI를 구현했습니다.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: '#',
  },
];

// 포트폴리오 카드 렌더링
function renderProjects() {
  const list = document.getElementById('project-list');
  if (!list) return;

  list.innerHTML = projects
    .map(
      (project) => `
        <article class="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div class="mb-5 flex h-40 items-center justify-center rounded-xl bg-green-50 text-4xl font-bold text-green-300">
            ${project.title.charAt(0)}
          </div>
          <h3 class="text-lg font-bold text-gray-900">${project.title}</h3>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-gray-500">${project.description}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            ${project.tags
              .map((tag) => `<span class="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">${tag}</span>`)
              .join('')}
          </div>
          <a href="${project.link}" class="mt-5 text-sm font-semibold text-green-600 transition hover:text-green-700">자세히 보기 &rarr;</a>
        </article>
      `
    )
    .join('');
}

// 모바일 메뉴 토글
function setupMobileMenu() {
  const button = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!button || !menu) return;

  const setOpen = (isOpen) => {
    menu.classList.toggle('hidden', !isOpen);
    button.setAttribute('aria-expanded', String(isOpen));
    button.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  };

  button.addEventListener('click', () => {
    setOpen(menu.classList.contains('hidden'));
  });

  // 메뉴 항목을 누르면 메뉴 닫기
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
}

// 스크롤 시 헤더 그림자
function setupHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// 섹션 등장 효과
function setupFadeIn() {
  const items = document.querySelectorAll('.fade-in');

  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((item) => observer.observe(item));
}

// 프로필 이미지 로드 실패 시 이니셜 "D" 표시
function setupProfileFallback() {
  const img = document.getElementById('profile-img');
  const fallback = document.getElementById('profile-fallback');
  if (!img || !fallback) return;

  img.addEventListener('error', () => {
    img.classList.add('hidden');
    fallback.classList.remove('hidden');
    fallback.classList.add('flex');
  });
}

// 푸터 연도 자동 표시
function setupYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  setupMobileMenu();
  setupHeaderScroll();
  setupFadeIn();
  setupProfileFallback();
  setupYear();
});
