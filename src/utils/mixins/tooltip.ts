const tooltip = {
  directives: {
    tooltip: {
      mounted(el, binding) {
        el.style.textOverflow = 'ellipsis';
        // el.style.display = 'inline-block';
        el.style.whiteSpace = 'nowrap';
        el.style.overflow = 'hidden';
        el.style.width = '100%';
        if (binding && binding.value) {
          if (binding.value.numberLine >= 2) {
            el.style.webkitLineClamp = binding.value.numberLine;
            el.style.whiteSpace = 'pre-line';
            el.style.webkitBoxOrient = 'vertical';
            el.style.display = '-webkit-box';
            el.style.position = 'relative';
          } else {
            el.style.display = 'flex';
            el.style.alignItems = 'center';
          }
        }
        el.addEventListener('mouseover', evt => {
          const targetEl = evt.target;
          if (binding && binding.value && binding.value.text) {
            targetEl.setAttribute('title', binding.value.text);
          } else if (binding && binding.value && binding.value.numberLine >= 2) {
            // targetEl.setAttribute('title', evt.target.textContent)
            targetEl.classList.add('tooltip-title');
            const removeTooltipEl = document.querySelector('.custom-tooltip');
            removeTooltipEl && removeTooltipEl.remove();

            const tooltipEl = document.createElement('div');
            tooltipEl.classList.add('custom-tooltip');
            tooltipEl.innerText = evt.target.textContent;
            document.body.appendChild(tooltipEl);

            // Custom style tooltip
            const rect = targetEl.getBoundingClientRect();
            tooltipEl.style.width = rect.width + 'px';
            tooltipEl.style.position = 'absolute';

            const heightW = document.body.offsetHeight;
            if (heightW - rect.bottom < tooltipEl.offsetHeight) {
              tooltipEl.style.top = rect.top - tooltipEl.offsetHeight + 'px';
            } else {
              tooltipEl.style.top = rect.bottom + 'px';
            }
            const widthW = document.body.offsetWidth;
            if (widthW - rect.left < tooltipEl.offsetWidth) {
              const widthMinus = rect.left + tooltipEl.offsetWidth - widthW;
              tooltipEl.style.left = rect.left - widthMinus - 16 + 'px';
            } else if (rect.left <= 16) {
              tooltipEl.style.left = 16 + 'px';
            } else {
              tooltipEl.style.left = rect.left + 'px';
            }
            if (rect.height + 18 >= tooltipEl.offsetHeight) {
              const removeTooltipEl = document.querySelector('.custom-tooltip');
              removeTooltipEl && removeTooltipEl.remove();
            }
          } else if (targetEl.offsetWidth < targetEl.scrollWidth) {
            targetEl.setAttribute('title', evt.target.textContent);
          } else {
            targetEl.hasAttribute('title') && targetEl.removeAttribute('title');
          }
        });
        document.body.addEventListener('mouseover', evt => {
          const classList = evt.target && evt.target.classList ? [...evt.target.classList] : [];
          if (!classList.includes('custom-tooltip') && !classList.includes('tooltip-title')) {
            const tooltipEl = document.querySelector('.custom-tooltip');
            tooltipEl && tooltipEl.remove();
          }
        });
      },
    },
  },
};
export default tooltip;
