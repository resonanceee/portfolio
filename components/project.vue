<template>
  <!-- ===================== CARD VARIANTS (feature / bento / default) ===================== -->
  <component
    :is="rootTag"
    v-if="variant !== 'accordion'"
    v-bind="rootAttrs"
    class="group relative block overflow-hidden rounded-2xl border border-cream/10 bg-indigo-900/40 transition-all duration-500 hover:border-cream/25 hover:bg-indigo-800/50"
  >
    <!-- Gradient mesh header (no stock image) -->
    <div class="relative h-32 md:h-40 overflow-hidden" :style="{ background: gradient }">
      <!-- ponytail: CSS texture overlay replaces photo grain — no external fetch, no broken img -->
      <div class="absolute inset-0 opacity-30 mix-blend-overlay" style="background-image: repeating-linear-gradient(135deg, transparent 0 12px, rgba(255,255,255,0.06) 12px 13px);"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-transparent to-transparent"></div>
      <span
        v-if="tag"
        class="absolute top-4 left-4 rounded-full bg-ink/70 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cream border border-cream/10"
      >
        {{ tag }}
      </span>
      <!-- big initials watermark for editorial feel -->
      <span class="absolute bottom-3 right-4 font-display text-5xl font-black text-cream/10 select-none">{{ initials }}</span>
      <!-- GitHub badge: card links internally, code link lives here -->
      <span
        v-if="rootTag === 'NuxtLink' && !isPrivate"
        role="link"
        tabindex="0"
        aria-label="View on GitHub"
        class="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 backdrop-blur border border-cream/10 text-cream/80 cursor-pointer transition-all duration-300 hover:text-cream hover:border-cream/40"
        @click.stop="openGithub"
        @keydown.enter.stop="openGithub"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>
      </span>
    </div>

    <!-- Body -->
    <div class="p-6 md:p-7 flex flex-col gap-3">
      <div class="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-orange/90">
        <span v-if="role">{{ role }}</span>
        <span v-if="role && org" class="text-cream/30">/</span>
        <span v-if="org" class="text-cream/50">{{ org }}</span>
      </div>
      <h3 class="font-display text-2xl md:text-3xl font-bold tracking-tight leading-tight text-cream">
        {{ head }}
      </h3>
      <p class="text-cream/65 text-sm md:text-base leading-relaxed line-clamp-4">{{ text }}</p>
      <div v-if="slug" class="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-cream/80 group-hover:text-orange transition-colors">
        Read writeup
        <svg class="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>
      </div>
      <div v-else-if="!isPrivate" class="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-cream/80 group-hover:text-orange transition-colors">
        Visit
        <svg class="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>
      </div>
      <div v-else class="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-cream/40">
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        Private
      </div>
    </div>
  </component>

  <!-- ===================== ACCORDION VARIANT (horizontal slice) ===================== -->
  <div
    v-else
    class="accordion-slice group relative h-full min-w-[80px] cursor-pointer overflow-hidden rounded-2xl border border-cream/10 transition-all duration-500 ease-out hover:border-cream/30"
    :class="open ? 'flex-[12]' : 'flex-[1]'"
    :style="{ background: gradient }"
    @mouseenter="$emit('open', index)"
    @click="toggleOpen"
  >
    <!-- texture overlay -->
    <div class="absolute inset-0 opacity-25 mix-blend-overlay" style="background-image: repeating-linear-gradient(135deg, transparent 0 12px, rgba(255,255,255,0.06) 12px 13px);"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/50 to-ink/20"></div>

    <!-- expanded content -->
    <div class="absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-300 delay-100"
      :class="open ? 'opacity-100' : 'opacity-0'">
      <div class="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-orange mb-2">
        <span v-if="role">{{ role }}</span>
      </div>
      <h3 class="font-display text-2xl font-bold tracking-tight text-cream mb-2">{{ head }}</h3>
      <p class="text-cream/80 text-sm leading-relaxed line-clamp-5 mb-3">{{ text }}</p>
      <a
        v-if="!isPrivate"
        :href="link"
        target="_blank"
        rel="noopener"
        @click.stop
        class="inline-flex items-center gap-1.5 text-sm font-semibold text-cream hover:text-orange transition-colors w-fit"
      >
        Visit
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>
      </a>
      <div v-else class="inline-flex items-center gap-1.5 text-sm font-medium text-cream/50 w-fit">
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        Private
      </div>
    </div>
  </div>
</template>

<script>
import { NuxtLink } from '#components';

export default {
  name: 'Project',
  components: { NuxtLink },
  props: {
    head: String,
    type: String,
    role: String,
    org: String,
    text: String,
    link: { type: String, default: '' },
    slug: { type: String, default: '' },
    tag: { type: String, default: '' },
    variant: { type: String, default: 'feature' },
    index: { type: Number, default: 0 },
    open: { type: Boolean, default: false },
  },
  emits: ['open'],
  computed: {
    isPrivate() {
      return this.link && this.link.includes('private');
    },
    // card routes internally when a writeup slug exists; GitHub stays reachable via the header badge
    rootTag() {
      if (this.slug) return 'NuxtLink';
      return this.isPrivate ? 'div' : 'a';
    },
    rootAttrs() {
      if (this.slug) return { to: `/work/${this.slug}` };
      if (this.isPrivate) return {};
      return { href: this.link, target: '_blank', rel: 'noopener' };
    },
    // ponytail: index-based gradient — guaranteed distinct within a grid, no stock photos, no external fetch
    gradient() {
      const presets = [
        'radial-gradient(circle at 25% 25%, #6d4ab1 0%, #1a2230 70%)',
        'radial-gradient(circle at 75% 30%, #efa819 0%, #3c3f58 75%)',
        'radial-gradient(circle at 50% 70%, #4253f1 0%, #1a2230 70%)',
        'radial-gradient(circle at 20% 80%, #ee856e 0%, #6d4ab1 70%)',
        'radial-gradient(circle at 80% 20%, #ffedc0 0%, #4253f1 75%)',
        'radial-gradient(circle at 60% 60%, #3c3f58 0%, #6d4ab1 80%)',
        'radial-gradient(circle at 35% 65%, #efa819 0%, #6d4ab1 70%)',
        'radial-gradient(circle at 90% 75%, #4253f1 0%, #efa819 80%)',
      ];
      return presets[this.index % presets.length];
    },
    initials() {
      return (this.head || '').split(' ').map(w => w[0]).slice(0, 3).join('').toUpperCase();
    },
  },
  methods: {
    toggleOpen() {
      this.$emit('open', this.open ? -1 : this.index);
    },
    openGithub() {
      if (this.link && !this.isPrivate) window.open(this.link, '_blank', 'noopener');
    },
  },
};
</script>

<style scoped>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-5 {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
