import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createContext, forwardRef, useContext, useEffect, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { CalendarIcon, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Circle, Languages, Loader2, Minus, Moon, MoreHorizontal, Slash, Sun, X } from "lucide-react";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import { de, enUS, es, ru } from "date-fns/locale";
import { endOfDay, endOfMonth, endOfWeek, format, set, startOfDay, startOfMonth, startOfWeek, startOfYear, subDays, subHours, subMonths } from "date-fns";
import { Toaster as Toaster$1 } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
//#region src/lib/utils.ts
/**
* Merge tailwind classes with deduplication. Use everywhere instead of raw template strings
* so that variants/overrides resolve predictably.
*/
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/lib/theme.tsx
var ThemeContext = createContext(null);
var STORAGE_KEY$1 = "ax-styler-theme";
function readInitial() {
	if (typeof document === "undefined") return "light";
	const attr = document.documentElement.getAttribute("data-theme");
	if (attr === "dark" || attr === "light") return attr;
	return "light";
}
function ThemeProvider({ children }) {
	const [theme, setThemeState] = useState(readInitial);
	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		try {
			localStorage.setItem(STORAGE_KEY$1, theme);
		} catch {}
	}, [theme]);
	const value = useMemo(() => ({
		theme,
		setTheme: setThemeState,
		toggle: () => setThemeState((t) => t === "dark" ? "light" : "dark")
	}), [theme]);
	return /* @__PURE__ */ jsx(ThemeContext.Provider, {
		value,
		children
	});
}
function useTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider />");
	return ctx;
}
//#endregion
//#region src/lib/i18n.tsx
var LOCALES = [
	"ru",
	"en",
	"es",
	"de"
];
var LOCALE_LABELS = {
	ru: {
		name: "Русский",
		flag: "🇷🇺"
	},
	en: {
		name: "English",
		flag: "🇬🇧"
	},
	es: {
		name: "Español",
		flag: "🇪🇸"
	},
	de: {
		name: "Deutsch",
		flag: "🇩🇪"
	}
};
var DICTIONARIES = {
	ru: {
		"app.title": "Ax Styler — Дизайн-система",
		"app.subtitle": "Полная библиотека UI-компонентов с поддержкой светлой и тёмной тем",
		"app.poweredBy": "React · Tailwind · Radix",
		"nav.foundations": "Основы",
		"nav.controls": "Контролы",
		"nav.forms": "Формы",
		"nav.dates": "Даты",
		"nav.overlays": "Оверлеи",
		"nav.feedback": "Уведомления",
		"nav.dataDisplay": "Данные",
		"nav.layouts": "Лейауты",
		"section.colors.title": "Цвета",
		"section.colors.desc": "Брендовая палитра и семантические токены автоматически адаптируются под тему.",
		"section.typography.title": "Типографика",
		"section.typography.desc": "Шрифт Inter, оптимизирован для интерфейсов с включёнными OpenType-фичами.",
		"section.buttons.title": "Кнопки",
		"section.buttons.desc": "Шесть вариантов и четыре размера. Все состояния — hover, active, focus, disabled, loading.",
		"section.inputs.title": "Поля ввода",
		"section.inputs.desc": "Текстовые поля, textarea, select, checkbox, radio, switch.",
		"section.form.title": "Большая форма",
		"section.form.desc": "Все типы полей в одном месте. Используйте как стартовый шаблон.",
		"section.validation.title": "Валидация",
		"section.validation.desc": "Required, формат e-mail, совпадение паролей, асинхронная проверка.",
		"section.dates.title": "Выбор дат",
		"section.dates.desc": "Дата, дата+время, диапазон с пресетами (сегодня, 24 часа, эта неделя, 30 дней…).",
		"section.cards.title": "Карточки",
		"section.cards.desc": "Поверхности для группировки контента.",
		"section.overlays.title": "Оверлеи",
		"section.overlays.desc": "Модалки и сайд-панели с размытием фона и плавной анимацией.",
		"section.feedback.title": "Уведомления",
		"section.feedback.desc": "Тосты, бейджи и прочая динамика. Тосты показываются сверху справа.",
		"section.dataDisplay.title": "Отображение данных",
		"section.dataDisplay.desc": "Аватары, табы, карточки.",
		"section.report.title": "Таблица-отчёт",
		"section.report.desc": "50 строк, кликабельная сортировка по любой колонке, зебра, sticky-шапка.",
		"section.layout.title": "Шаблоны лейаута",
		"section.layout.desc": "Сайдбар, верхнее меню, хлебные крошки — готовые скелеты для приложений.",
		"btn.primary": "Основная",
		"btn.secondary": "Вторичная",
		"btn.outline": "Контурная",
		"btn.ghost": "Призрачная",
		"btn.danger": "Опасная",
		"btn.link": "Ссылка",
		"btn.loading": "Загрузка…",
		"btn.withIcon": "С иконкой",
		"btn.continue": "Применить",
		"btn.cancel": "Отмена",
		"btn.save": "Сохранить",
		"btn.delete": "Удалить",
		"btn.openModal": "Открыть модалку",
		"btn.openDrawer": "Открыть drawer",
		"btn.showToast": "Показать тост",
		"btn.showSuccess": "Успех",
		"btn.showError": "Ошибка",
		"btn.showInfo": "Инфо",
		"btn.showPromise": "С промисом",
		"btn.submit": "Отправить",
		"btn.reset": "Сбросить",
		"size.sm": "Малый",
		"size.md": "Средний",
		"size.lg": "Большой",
		"size.icon": "Иконка",
		"input.label.email": "E-mail",
		"input.placeholder.email": "you@example.com",
		"input.label.password": "Пароль",
		"input.placeholder.password": "••••••••",
		"input.label.search": "Поиск",
		"input.placeholder.search": "Поиск компонентов…",
		"input.label.message": "Сообщение",
		"input.placeholder.message": "Расскажите подробнее…",
		"input.label.role": "Роль",
		"input.placeholder.role": "Выберите роль",
		"input.error.email": "Введите корректный e-mail",
		"input.help.password": "Минимум 8 символов, должна быть цифра",
		"input.disabled": "Заблокировано",
		"role.admin": "Администратор",
		"role.editor": "Редактор",
		"role.viewer": "Зритель",
		"role.guest": "Гость",
		"check.terms": "Я принимаю условия использования",
		"check.newsletter": "Подписаться на рассылку",
		"radio.plan.title": "Тариф",
		"radio.plan.free": "Бесплатный",
		"radio.plan.pro": "Pro",
		"radio.plan.team": "Team",
		"switch.notifications": "Уведомления",
		"switch.marketing": "Маркетинг по e-mail",
		"modal.title": "Подтверждение действия",
		"modal.desc": "Вы уверены, что хотите выполнить это действие? Его нельзя будет отменить.",
		"drawer.title": "Настройки профиля",
		"drawer.desc": "Управляйте параметрами своего аккаунта.",
		"toast.success": "Изменения сохранены",
		"toast.error": "Что-то пошло не так",
		"toast.info": "Новое обновление доступно",
		"toast.promise.loading": "Сохраняем…",
		"toast.promise.success": "Готово!",
		"toast.promise.error": "Не удалось сохранить",
		"badge.new": "Новое",
		"badge.beta": "Beta",
		"badge.pro": "Pro",
		"badge.live": "Live",
		"table.col.user": "Пользователь",
		"table.col.role": "Роль",
		"table.col.status": "Статус",
		"table.col.lastSeen": "Был онлайн",
		"table.col.email": "E-mail",
		"table.col.plan": "Тариф",
		"table.col.mrr": "MRR",
		"table.col.signup": "Регистрация",
		"table.col.activity": "Активность",
		"table.rowsCount": "{n} записей",
		"table.search": "Поиск по таблице…",
		"status.active": "Активен",
		"status.invited": "Приглашён",
		"status.suspended": "Заблокирован",
		"status.trial": "Триал",
		"theme.light": "Светлая",
		"theme.dark": "Тёмная",
		"theme.system": "Системная",
		"lang.label": "Язык",
		"tabs.overview": "Обзор",
		"tabs.activity": "Активность",
		"tabs.settings": "Настройки",
		"tabs.billing": "Биллинг",
		"tooltip.copy": "Скопировать",
		"tooltip.copied": "Скопировано",
		"dropdown.profile": "Профиль",
		"dropdown.settings": "Настройки",
		"dropdown.team": "Команда",
		"dropdown.invite": "Пригласить участников",
		"dropdown.shortcuts": "Горячие клавиши",
		"dropdown.signout": "Выйти",
		"form.field.firstName": "Имя",
		"form.field.lastName": "Фамилия",
		"form.field.username": "Логин",
		"form.field.country": "Страна",
		"form.field.bio": "О себе",
		"form.field.birthdate": "Дата рождения",
		"form.field.interests": "Интересы",
		"form.field.plan": "Тариф",
		"form.field.passwordConfirm": "Подтверждение пароля",
		"form.placeholder.firstName": "Иван",
		"form.placeholder.lastName": "Иванов",
		"form.placeholder.username": "ivanov",
		"form.placeholder.country": "Выберите страну",
		"form.placeholder.bio": "Несколько слов о себе…",
		"form.error.required": "Обязательное поле",
		"form.error.invalidEmail": "Некорректный e-mail",
		"form.error.tooShort": "Минимум {n} символов",
		"form.error.mismatch": "Пароли не совпадают",
		"form.error.weakPassword": "Слабый пароль — добавьте цифру",
		"form.username.checking": "Проверяем…",
		"form.username.available": "Логин свободен",
		"form.username.taken": "Логин занят",
		"form.passwordStrength.weak": "Слабый",
		"form.passwordStrength.ok": "Нормально",
		"form.passwordStrength.strong": "Надёжный",
		"interest.design": "Дизайн",
		"interest.dev": "Разработка",
		"interest.product": "Продукт",
		"interest.marketing": "Маркетинг",
		"country.us": "США",
		"country.ru": "Россия",
		"country.es": "Испания",
		"country.de": "Германия",
		"country.jp": "Япония",
		"country.br": "Бразилия",
		"datepicker.placeholder.date": "Выберите дату",
		"datepicker.placeholder.range": "Выберите диапазон",
		"datepicker.placeholder.dateTime": "Выберите дату и время",
		"datepicker.time": "Время",
		"datepicker.preset.today": "Сегодня",
		"datepicker.preset.yesterday": "Вчера",
		"datepicker.preset.weekAgo": "Неделю назад",
		"datepicker.preset.monthAgo": "Месяц назад",
		"datepicker.preset.last24h": "Последние 24 часа",
		"datepicker.preset.last7d": "Последние 7 дней",
		"datepicker.preset.last30d": "Последние 30 дней",
		"datepicker.preset.thisWeek": "Эта неделя",
		"datepicker.preset.lastWeek": "Прошлая неделя",
		"datepicker.preset.thisMonth": "Этот месяц",
		"datepicker.preset.lastMonth": "Прошлый месяц",
		"datepicker.preset.thisYear": "Этот год",
		"layout.sidebar.title": "Сайдбар-лейаут",
		"layout.sidebar.desc": "Боковое меню слева, шапка с действиями, контент с хлебными крошками.",
		"layout.topnav.title": "Лейаут с верхним меню",
		"layout.topnav.desc": "Горизонтальное меню в шапке, контент во всю ширину.",
		"layout.nav.dashboard": "Дашборд",
		"layout.nav.projects": "Проекты",
		"layout.nav.team": "Команда",
		"layout.nav.reports": "Отчёты",
		"layout.nav.settings": "Настройки",
		"layout.nav.billing": "Биллинг",
		"layout.nav.help": "Помощь",
		"layout.search": "Быстрый поиск",
		"breadcrumb.home": "Главная",
		"breadcrumb.users": "Пользователи",
		"breadcrumb.profile": "Профиль",
		"breadcrumb.dashboard": "Дашборд",
		"breadcrumb.reports": "Отчёты",
		"breadcrumb.q4": "Q4 2026",
		"plan.free.desc": "Для начинающих",
		"plan.pro.desc": "Для профессионалов",
		"plan.team.desc": "Для команд",
		"nav.tabs": "Табы",
		"nav.pagination": "Пагинация",
		"nav.menu": "Меню",
		"nav.openMenu": "Открыть меню",
		"nav.components": "Компоненты",
		"section.tabs.title": "Табы",
		"section.tabs.desc": "Четыре варианта оформления, иконки, бейджи, вертикальная ориентация.",
		"section.pagination.title": "Пагинация",
		"section.pagination.desc": "Numbered, compact, cursor (load more), с выбором размера страницы. Реальный пример — в таблице-отчёте.",
		"pagination.rowsPerPage": "Строк на странице",
		"pagination.itemsRange": "{from}–{to} из {total}",
		"pagination.pageOf": "Страница {current} из {total}",
		"pagination.shownOf": "Показано {shown} из {total}",
		"pagination.loadMore": "Загрузить ещё {n}",
		"pagination.allLoaded": "Всё загружено",
		"pagination.helperHint": "Передайте в helper currentPage, totalPages и siblings — получите массив страниц + маркеры эллипсиса. Дальше map по элементам — и любая визуализация.",
		"table.empty": "Ничего не найдено"
	},
	en: {
		"app.title": "Ax Styler — Design System",
		"app.subtitle": "A complete UI component library with full light and dark theme support",
		"app.poweredBy": "React · Tailwind · Radix",
		"nav.foundations": "Foundations",
		"nav.controls": "Controls",
		"nav.forms": "Forms",
		"nav.dates": "Dates",
		"nav.overlays": "Overlays",
		"nav.feedback": "Notifications",
		"nav.dataDisplay": "Data",
		"nav.layouts": "Layouts",
		"section.colors.title": "Colors",
		"section.colors.desc": "Brand palette and semantic tokens that automatically adapt to the theme.",
		"section.typography.title": "Typography",
		"section.typography.desc": "Inter typeface, tuned for UI with OpenType features enabled.",
		"section.buttons.title": "Buttons",
		"section.buttons.desc": "Six variants, four sizes. All states — hover, active, focus, disabled, loading.",
		"section.inputs.title": "Inputs",
		"section.inputs.desc": "Text inputs, textarea, select, checkbox, radio, switch.",
		"section.form.title": "Full form",
		"section.form.desc": "Every field type in one place. Use it as a starting template.",
		"section.validation.title": "Validation",
		"section.validation.desc": "Required, email format, password match, async username check.",
		"section.dates.title": "Date pickers",
		"section.dates.desc": "Date, date+time, range with presets (today, last 24h, this week, 30 days…).",
		"section.cards.title": "Cards",
		"section.cards.desc": "Surfaces for grouping related content.",
		"section.overlays.title": "Overlays",
		"section.overlays.desc": "Modals and side drawers with backdrop blur and smooth motion.",
		"section.feedback.title": "Notifications",
		"section.feedback.desc": "Toasts, badges and other dynamic feedback. Toasts appear at the top right.",
		"section.dataDisplay.title": "Data display",
		"section.dataDisplay.desc": "Avatars, tabs, cards.",
		"section.report.title": "Report table",
		"section.report.desc": "50 rows, click-sort on any column, zebra striping, sticky header.",
		"section.layout.title": "Layout patterns",
		"section.layout.desc": "Sidebar, top-nav, breadcrumbs — ready-to-use app skeletons.",
		"btn.primary": "Primary",
		"btn.secondary": "Secondary",
		"btn.outline": "Outline",
		"btn.ghost": "Ghost",
		"btn.danger": "Danger",
		"btn.link": "Link",
		"btn.loading": "Loading…",
		"btn.withIcon": "With icon",
		"btn.continue": "Apply",
		"btn.cancel": "Cancel",
		"btn.save": "Save",
		"btn.delete": "Delete",
		"btn.openModal": "Open modal",
		"btn.openDrawer": "Open drawer",
		"btn.showToast": "Show toast",
		"btn.showSuccess": "Success",
		"btn.showError": "Error",
		"btn.showInfo": "Info",
		"btn.showPromise": "With promise",
		"btn.submit": "Submit",
		"btn.reset": "Reset",
		"size.sm": "Small",
		"size.md": "Medium",
		"size.lg": "Large",
		"size.icon": "Icon",
		"input.label.email": "Email",
		"input.placeholder.email": "you@example.com",
		"input.label.password": "Password",
		"input.placeholder.password": "••••••••",
		"input.label.search": "Search",
		"input.placeholder.search": "Search components…",
		"input.label.message": "Message",
		"input.placeholder.message": "Tell us more…",
		"input.label.role": "Role",
		"input.placeholder.role": "Pick a role",
		"input.error.email": "Please enter a valid email",
		"input.help.password": "At least 8 characters, must include a digit",
		"input.disabled": "Disabled",
		"role.admin": "Administrator",
		"role.editor": "Editor",
		"role.viewer": "Viewer",
		"role.guest": "Guest",
		"check.terms": "I accept the terms of service",
		"check.newsletter": "Subscribe to newsletter",
		"radio.plan.title": "Plan",
		"radio.plan.free": "Free",
		"radio.plan.pro": "Pro",
		"radio.plan.team": "Team",
		"switch.notifications": "Notifications",
		"switch.marketing": "Marketing emails",
		"modal.title": "Confirm action",
		"modal.desc": "Are you sure you want to perform this action? It cannot be undone.",
		"drawer.title": "Profile settings",
		"drawer.desc": "Manage your account preferences.",
		"toast.success": "Changes saved",
		"toast.error": "Something went wrong",
		"toast.info": "A new update is available",
		"toast.promise.loading": "Saving…",
		"toast.promise.success": "Done!",
		"toast.promise.error": "Failed to save",
		"badge.new": "New",
		"badge.beta": "Beta",
		"badge.pro": "Pro",
		"badge.live": "Live",
		"table.col.user": "User",
		"table.col.role": "Role",
		"table.col.status": "Status",
		"table.col.lastSeen": "Last seen",
		"table.col.email": "Email",
		"table.col.plan": "Plan",
		"table.col.mrr": "MRR",
		"table.col.signup": "Joined",
		"table.col.activity": "Activity",
		"table.rowsCount": "{n} rows",
		"table.search": "Search the table…",
		"status.active": "Active",
		"status.invited": "Invited",
		"status.suspended": "Suspended",
		"status.trial": "Trial",
		"theme.light": "Light",
		"theme.dark": "Dark",
		"theme.system": "System",
		"lang.label": "Language",
		"tabs.overview": "Overview",
		"tabs.activity": "Activity",
		"tabs.settings": "Settings",
		"tabs.billing": "Billing",
		"tooltip.copy": "Copy",
		"tooltip.copied": "Copied",
		"dropdown.profile": "Profile",
		"dropdown.settings": "Settings",
		"dropdown.team": "Team",
		"dropdown.invite": "Invite members",
		"dropdown.shortcuts": "Keyboard shortcuts",
		"dropdown.signout": "Sign out",
		"form.field.firstName": "First name",
		"form.field.lastName": "Last name",
		"form.field.username": "Username",
		"form.field.country": "Country",
		"form.field.bio": "Bio",
		"form.field.birthdate": "Date of birth",
		"form.field.interests": "Interests",
		"form.field.plan": "Plan",
		"form.field.passwordConfirm": "Confirm password",
		"form.placeholder.firstName": "John",
		"form.placeholder.lastName": "Doe",
		"form.placeholder.username": "johndoe",
		"form.placeholder.country": "Pick a country",
		"form.placeholder.bio": "A few words about yourself…",
		"form.error.required": "Required field",
		"form.error.invalidEmail": "Invalid email",
		"form.error.tooShort": "At least {n} characters",
		"form.error.mismatch": "Passwords do not match",
		"form.error.weakPassword": "Weak — add a digit",
		"form.username.checking": "Checking…",
		"form.username.available": "Username is available",
		"form.username.taken": "Username is taken",
		"form.passwordStrength.weak": "Weak",
		"form.passwordStrength.ok": "OK",
		"form.passwordStrength.strong": "Strong",
		"interest.design": "Design",
		"interest.dev": "Engineering",
		"interest.product": "Product",
		"interest.marketing": "Marketing",
		"country.us": "United States",
		"country.ru": "Russia",
		"country.es": "Spain",
		"country.de": "Germany",
		"country.jp": "Japan",
		"country.br": "Brazil",
		"datepicker.placeholder.date": "Pick a date",
		"datepicker.placeholder.range": "Pick a range",
		"datepicker.placeholder.dateTime": "Pick date and time",
		"datepicker.time": "Time",
		"datepicker.preset.today": "Today",
		"datepicker.preset.yesterday": "Yesterday",
		"datepicker.preset.weekAgo": "A week ago",
		"datepicker.preset.monthAgo": "A month ago",
		"datepicker.preset.last24h": "Last 24 hours",
		"datepicker.preset.last7d": "Last 7 days",
		"datepicker.preset.last30d": "Last 30 days",
		"datepicker.preset.thisWeek": "This week",
		"datepicker.preset.lastWeek": "Last week",
		"datepicker.preset.thisMonth": "This month",
		"datepicker.preset.lastMonth": "Last month",
		"datepicker.preset.thisYear": "This year",
		"layout.sidebar.title": "Sidebar layout",
		"layout.sidebar.desc": "Vertical menu on the left, header with actions, content with breadcrumbs.",
		"layout.topnav.title": "Top-nav layout",
		"layout.topnav.desc": "Horizontal navigation in the header, full-width content.",
		"layout.nav.dashboard": "Dashboard",
		"layout.nav.projects": "Projects",
		"layout.nav.team": "Team",
		"layout.nav.reports": "Reports",
		"layout.nav.settings": "Settings",
		"layout.nav.billing": "Billing",
		"layout.nav.help": "Help",
		"layout.search": "Quick search",
		"breadcrumb.home": "Home",
		"breadcrumb.users": "Users",
		"breadcrumb.profile": "Profile",
		"breadcrumb.dashboard": "Dashboard",
		"breadcrumb.reports": "Reports",
		"breadcrumb.q4": "Q4 2026",
		"plan.free.desc": "For getting started",
		"plan.pro.desc": "For professionals",
		"plan.team.desc": "For teams",
		"nav.tabs": "Tabs",
		"nav.pagination": "Pagination",
		"nav.menu": "Menu",
		"nav.openMenu": "Open menu",
		"nav.components": "Components",
		"section.tabs.title": "Tabs",
		"section.tabs.desc": "Four visual variants, icons, badges, vertical orientation.",
		"section.pagination.title": "Pagination",
		"section.pagination.desc": "Numbered, compact, cursor (load more), with page-size picker. The report table below shows it in context.",
		"pagination.rowsPerPage": "Rows per page",
		"pagination.itemsRange": "{from}–{to} of {total}",
		"pagination.pageOf": "Page {current} of {total}",
		"pagination.shownOf": "Showing {shown} of {total}",
		"pagination.loadMore": "Load {n} more",
		"pagination.allLoaded": "All loaded",
		"pagination.helperHint": "Pass currentPage, totalPages and siblings into the helper — it returns an array of page numbers and ellipsis markers. Map over it to render any UI.",
		"table.empty": "No matching rows"
	},
	es: {
		"app.title": "Ax Styler — Sistema de diseño",
		"app.subtitle": "Biblioteca completa de componentes UI con soporte para tema claro y oscuro",
		"app.poweredBy": "React · Tailwind · Radix",
		"nav.foundations": "Fundamentos",
		"nav.controls": "Controles",
		"nav.forms": "Formularios",
		"nav.dates": "Fechas",
		"nav.overlays": "Superposiciones",
		"nav.feedback": "Notificaciones",
		"nav.dataDisplay": "Datos",
		"nav.layouts": "Diseños",
		"section.colors.title": "Colores",
		"section.colors.desc": "Paleta de marca y tokens semánticos que se adaptan automáticamente al tema.",
		"section.typography.title": "Tipografía",
		"section.typography.desc": "Tipografía Inter, optimizada para UI con OpenType activas.",
		"section.buttons.title": "Botones",
		"section.buttons.desc": "Seis variantes y cuatro tamaños. Todos los estados.",
		"section.inputs.title": "Campos",
		"section.inputs.desc": "Inputs, textarea, select, checkbox, radio, switch.",
		"section.form.title": "Formulario completo",
		"section.form.desc": "Todos los tipos de campo en un solo lugar.",
		"section.validation.title": "Validación",
		"section.validation.desc": "Required, formato e-mail, coincidencia de contraseñas, comprobación asíncrona.",
		"section.dates.title": "Selectores de fecha",
		"section.dates.desc": "Fecha, fecha+hora, rango con presets (hoy, 24 h, esta semana, 30 días…).",
		"section.cards.title": "Tarjetas",
		"section.cards.desc": "Superficies para agrupar contenido.",
		"section.overlays.title": "Superposiciones",
		"section.overlays.desc": "Modales y paneles laterales con desenfoque y animación suave.",
		"section.feedback.title": "Notificaciones",
		"section.feedback.desc": "Toasts, badges y feedback dinámico. Los toasts aparecen arriba a la derecha.",
		"section.dataDisplay.title": "Datos",
		"section.dataDisplay.desc": "Avatares, pestañas, tarjetas.",
		"section.report.title": "Tabla de informe",
		"section.report.desc": "50 filas, ordenación por columna, zebra, header sticky.",
		"section.layout.title": "Plantillas de layout",
		"section.layout.desc": "Sidebar, top-nav, breadcrumbs — esqueletos listos para apps.",
		"btn.primary": "Principal",
		"btn.secondary": "Secundario",
		"btn.outline": "Contorno",
		"btn.ghost": "Fantasma",
		"btn.danger": "Peligro",
		"btn.link": "Enlace",
		"btn.loading": "Cargando…",
		"btn.withIcon": "Con icono",
		"btn.continue": "Aplicar",
		"btn.cancel": "Cancelar",
		"btn.save": "Guardar",
		"btn.delete": "Eliminar",
		"btn.openModal": "Abrir modal",
		"btn.openDrawer": "Abrir drawer",
		"btn.showToast": "Mostrar toast",
		"btn.showSuccess": "Éxito",
		"btn.showError": "Error",
		"btn.showInfo": "Info",
		"btn.showPromise": "Con promise",
		"btn.submit": "Enviar",
		"btn.reset": "Restablecer",
		"size.sm": "Pequeño",
		"size.md": "Medio",
		"size.lg": "Grande",
		"size.icon": "Icono",
		"input.label.email": "Correo",
		"input.placeholder.email": "tu@ejemplo.com",
		"input.label.password": "Contraseña",
		"input.placeholder.password": "••••••••",
		"input.label.search": "Buscar",
		"input.placeholder.search": "Buscar componentes…",
		"input.label.message": "Mensaje",
		"input.placeholder.message": "Cuéntanos más…",
		"input.label.role": "Rol",
		"input.placeholder.role": "Elige un rol",
		"input.error.email": "Introduce un correo válido",
		"input.help.password": "Al menos 8 caracteres, con un dígito",
		"input.disabled": "Deshabilitado",
		"role.admin": "Administrador",
		"role.editor": "Editor",
		"role.viewer": "Visor",
		"role.guest": "Invitado",
		"check.terms": "Acepto los términos del servicio",
		"check.newsletter": "Suscribirme al boletín",
		"radio.plan.title": "Plan",
		"radio.plan.free": "Gratis",
		"radio.plan.pro": "Pro",
		"radio.plan.team": "Equipo",
		"switch.notifications": "Notificaciones",
		"switch.marketing": "Correos de marketing",
		"modal.title": "Confirmar acción",
		"modal.desc": "¿Seguro que quieres realizar esta acción? No se podrá deshacer.",
		"drawer.title": "Configuración del perfil",
		"drawer.desc": "Gestiona las preferencias de tu cuenta.",
		"toast.success": "Cambios guardados",
		"toast.error": "Algo salió mal",
		"toast.info": "Nueva actualización disponible",
		"toast.promise.loading": "Guardando…",
		"toast.promise.success": "¡Listo!",
		"toast.promise.error": "No se pudo guardar",
		"badge.new": "Nuevo",
		"badge.beta": "Beta",
		"badge.pro": "Pro",
		"badge.live": "En vivo",
		"table.col.user": "Usuario",
		"table.col.role": "Rol",
		"table.col.status": "Estado",
		"table.col.lastSeen": "Última vez",
		"table.col.email": "Correo",
		"table.col.plan": "Plan",
		"table.col.mrr": "MRR",
		"table.col.signup": "Alta",
		"table.col.activity": "Actividad",
		"table.rowsCount": "{n} filas",
		"table.search": "Buscar en la tabla…",
		"status.active": "Activo",
		"status.invited": "Invitado",
		"status.suspended": "Suspendido",
		"status.trial": "Prueba",
		"theme.light": "Claro",
		"theme.dark": "Oscuro",
		"theme.system": "Sistema",
		"lang.label": "Idioma",
		"tabs.overview": "Resumen",
		"tabs.activity": "Actividad",
		"tabs.settings": "Ajustes",
		"tabs.billing": "Facturación",
		"tooltip.copy": "Copiar",
		"tooltip.copied": "Copiado",
		"dropdown.profile": "Perfil",
		"dropdown.settings": "Ajustes",
		"dropdown.team": "Equipo",
		"dropdown.invite": "Invitar miembros",
		"dropdown.shortcuts": "Atajos de teclado",
		"dropdown.signout": "Cerrar sesión",
		"form.field.firstName": "Nombre",
		"form.field.lastName": "Apellido",
		"form.field.username": "Usuario",
		"form.field.country": "País",
		"form.field.bio": "Bio",
		"form.field.birthdate": "Fecha de nacimiento",
		"form.field.interests": "Intereses",
		"form.field.plan": "Plan",
		"form.field.passwordConfirm": "Confirmar contraseña",
		"form.placeholder.firstName": "Juan",
		"form.placeholder.lastName": "García",
		"form.placeholder.username": "juangarcia",
		"form.placeholder.country": "Elige un país",
		"form.placeholder.bio": "Unas palabras sobre ti…",
		"form.error.required": "Campo obligatorio",
		"form.error.invalidEmail": "Correo no válido",
		"form.error.tooShort": "Mínimo {n} caracteres",
		"form.error.mismatch": "Las contraseñas no coinciden",
		"form.error.weakPassword": "Débil — añade un dígito",
		"form.username.checking": "Comprobando…",
		"form.username.available": "Usuario disponible",
		"form.username.taken": "Usuario ocupado",
		"form.passwordStrength.weak": "Débil",
		"form.passwordStrength.ok": "OK",
		"form.passwordStrength.strong": "Fuerte",
		"interest.design": "Diseño",
		"interest.dev": "Desarrollo",
		"interest.product": "Producto",
		"interest.marketing": "Marketing",
		"country.us": "EE. UU.",
		"country.ru": "Rusia",
		"country.es": "España",
		"country.de": "Alemania",
		"country.jp": "Japón",
		"country.br": "Brasil",
		"datepicker.placeholder.date": "Elige una fecha",
		"datepicker.placeholder.range": "Elige un rango",
		"datepicker.placeholder.dateTime": "Elige fecha y hora",
		"datepicker.time": "Hora",
		"datepicker.preset.today": "Hoy",
		"datepicker.preset.yesterday": "Ayer",
		"datepicker.preset.weekAgo": "Hace una semana",
		"datepicker.preset.monthAgo": "Hace un mes",
		"datepicker.preset.last24h": "Últimas 24 horas",
		"datepicker.preset.last7d": "Últimos 7 días",
		"datepicker.preset.last30d": "Últimos 30 días",
		"datepicker.preset.thisWeek": "Esta semana",
		"datepicker.preset.lastWeek": "Semana pasada",
		"datepicker.preset.thisMonth": "Este mes",
		"datepicker.preset.lastMonth": "Mes pasado",
		"datepicker.preset.thisYear": "Este año",
		"layout.sidebar.title": "Layout con sidebar",
		"layout.sidebar.desc": "Menú vertical, cabecera con acciones, contenido con breadcrumbs.",
		"layout.topnav.title": "Layout con top-nav",
		"layout.topnav.desc": "Navegación horizontal en la cabecera, contenido a ancho completo.",
		"layout.nav.dashboard": "Panel",
		"layout.nav.projects": "Proyectos",
		"layout.nav.team": "Equipo",
		"layout.nav.reports": "Informes",
		"layout.nav.settings": "Ajustes",
		"layout.nav.billing": "Facturación",
		"layout.nav.help": "Ayuda",
		"layout.search": "Búsqueda rápida",
		"breadcrumb.home": "Inicio",
		"breadcrumb.users": "Usuarios",
		"breadcrumb.profile": "Perfil",
		"breadcrumb.dashboard": "Panel",
		"breadcrumb.reports": "Informes",
		"breadcrumb.q4": "T4 2026",
		"plan.free.desc": "Para empezar",
		"plan.pro.desc": "Para profesionales",
		"plan.team.desc": "Para equipos",
		"nav.tabs": "Pestañas",
		"nav.pagination": "Paginación",
		"nav.menu": "Menú",
		"nav.openMenu": "Abrir menú",
		"nav.components": "Componentes",
		"section.tabs.title": "Pestañas",
		"section.tabs.desc": "Cuatro variantes visuales, iconos, badges, orientación vertical.",
		"section.pagination.title": "Paginación",
		"section.pagination.desc": "Numerada, compacta, cursor (load more), con selector de tamaño de página. La tabla más abajo lo muestra en uso real.",
		"pagination.rowsPerPage": "Filas por página",
		"pagination.itemsRange": "{from}–{to} de {total}",
		"pagination.pageOf": "Página {current} de {total}",
		"pagination.shownOf": "Mostrando {shown} de {total}",
		"pagination.loadMore": "Cargar {n} más",
		"pagination.allLoaded": "Todo cargado",
		"pagination.helperHint": "Pasa currentPage, totalPages y siblings al helper — devuelve un array de números de página y marcadores de elipsis. Itéralo para renderizar cualquier UI.",
		"table.empty": "Sin coincidencias"
	},
	de: {
		"app.title": "Ax Styler — Designsystem",
		"app.subtitle": "Vollständige UI-Komponentenbibliothek mit Hell- und Dunkel-Theme",
		"app.poweredBy": "React · Tailwind · Radix",
		"nav.foundations": "Grundlagen",
		"nav.controls": "Steuerelemente",
		"nav.forms": "Formulare",
		"nav.dates": "Daten",
		"nav.overlays": "Overlays",
		"nav.feedback": "Benachrichtigungen",
		"nav.dataDisplay": "Daten",
		"nav.layouts": "Layouts",
		"section.colors.title": "Farben",
		"section.colors.desc": "Markenpalette und semantische Tokens passen sich automatisch an.",
		"section.typography.title": "Typografie",
		"section.typography.desc": "Inter-Schrift, optimiert für UIs.",
		"section.buttons.title": "Buttons",
		"section.buttons.desc": "Sechs Varianten, vier Größen.",
		"section.inputs.title": "Eingabefelder",
		"section.inputs.desc": "Textfelder, Textarea, Select, Checkbox, Radio, Switch.",
		"section.form.title": "Großes Formular",
		"section.form.desc": "Alle Feldtypen an einem Ort.",
		"section.validation.title": "Validierung",
		"section.validation.desc": "Required, E-Mail-Format, Passwort-Übereinstimmung, asynchrone Prüfung.",
		"section.dates.title": "Datumsauswahl",
		"section.dates.desc": "Datum, Datum+Zeit, Bereich mit Presets (heute, 24 h, diese Woche, 30 Tage…).",
		"section.cards.title": "Karten",
		"section.cards.desc": "Flächen zur Inhaltsgruppierung.",
		"section.overlays.title": "Overlays",
		"section.overlays.desc": "Modale und Drawers mit Hintergrundunschärfe.",
		"section.feedback.title": "Benachrichtigungen",
		"section.feedback.desc": "Toasts, Badges. Toasts erscheinen oben rechts.",
		"section.dataDisplay.title": "Datenanzeige",
		"section.dataDisplay.desc": "Avatare, Tabs, Karten.",
		"section.report.title": "Berichts-Tabelle",
		"section.report.desc": "50 Zeilen, Klick-Sortierung, Zebra-Streifen, sticky Header.",
		"section.layout.title": "Layout-Vorlagen",
		"section.layout.desc": "Sidebar, Top-Nav, Breadcrumbs — fertige App-Skelette.",
		"btn.primary": "Primär",
		"btn.secondary": "Sekundär",
		"btn.outline": "Umrandet",
		"btn.ghost": "Geist",
		"btn.danger": "Gefahr",
		"btn.link": "Link",
		"btn.loading": "Lädt…",
		"btn.withIcon": "Mit Icon",
		"btn.continue": "Übernehmen",
		"btn.cancel": "Abbrechen",
		"btn.save": "Speichern",
		"btn.delete": "Löschen",
		"btn.openModal": "Modal öffnen",
		"btn.openDrawer": "Drawer öffnen",
		"btn.showToast": "Toast anzeigen",
		"btn.showSuccess": "Erfolg",
		"btn.showError": "Fehler",
		"btn.showInfo": "Info",
		"btn.showPromise": "Mit Promise",
		"btn.submit": "Absenden",
		"btn.reset": "Zurücksetzen",
		"size.sm": "Klein",
		"size.md": "Mittel",
		"size.lg": "Groß",
		"size.icon": "Icon",
		"input.label.email": "E-Mail",
		"input.placeholder.email": "du@beispiel.de",
		"input.label.password": "Passwort",
		"input.placeholder.password": "••••••••",
		"input.label.search": "Suche",
		"input.placeholder.search": "Komponenten suchen…",
		"input.label.message": "Nachricht",
		"input.placeholder.message": "Erzähle uns mehr…",
		"input.label.role": "Rolle",
		"input.placeholder.role": "Rolle auswählen",
		"input.error.email": "Gültige E-Mail eingeben",
		"input.help.password": "Mindestens 8 Zeichen, mit Ziffer",
		"input.disabled": "Deaktiviert",
		"role.admin": "Administrator",
		"role.editor": "Redakteur",
		"role.viewer": "Betrachter",
		"role.guest": "Gast",
		"check.terms": "Ich akzeptiere die Nutzungsbedingungen",
		"check.newsletter": "Newsletter abonnieren",
		"radio.plan.title": "Tarif",
		"radio.plan.free": "Kostenlos",
		"radio.plan.pro": "Pro",
		"radio.plan.team": "Team",
		"switch.notifications": "Benachrichtigungen",
		"switch.marketing": "Marketing-E-Mails",
		"modal.title": "Aktion bestätigen",
		"modal.desc": "Möchtest du diese Aktion wirklich ausführen?",
		"drawer.title": "Profil-Einstellungen",
		"drawer.desc": "Verwalte deine Konto-Einstellungen.",
		"toast.success": "Änderungen gespeichert",
		"toast.error": "Etwas ist schiefgelaufen",
		"toast.info": "Update verfügbar",
		"toast.promise.loading": "Speichern…",
		"toast.promise.success": "Fertig!",
		"toast.promise.error": "Speichern fehlgeschlagen",
		"badge.new": "Neu",
		"badge.beta": "Beta",
		"badge.pro": "Pro",
		"badge.live": "Live",
		"table.col.user": "Benutzer",
		"table.col.role": "Rolle",
		"table.col.status": "Status",
		"table.col.lastSeen": "Zuletzt online",
		"table.col.email": "E-Mail",
		"table.col.plan": "Tarif",
		"table.col.mrr": "MRR",
		"table.col.signup": "Beitritt",
		"table.col.activity": "Aktivität",
		"table.rowsCount": "{n} Zeilen",
		"table.search": "Tabelle durchsuchen…",
		"status.active": "Aktiv",
		"status.invited": "Eingeladen",
		"status.suspended": "Gesperrt",
		"status.trial": "Test",
		"theme.light": "Hell",
		"theme.dark": "Dunkel",
		"theme.system": "System",
		"lang.label": "Sprache",
		"tabs.overview": "Übersicht",
		"tabs.activity": "Aktivität",
		"tabs.settings": "Einstellungen",
		"tabs.billing": "Abrechnung",
		"tooltip.copy": "Kopieren",
		"tooltip.copied": "Kopiert",
		"dropdown.profile": "Profil",
		"dropdown.settings": "Einstellungen",
		"dropdown.team": "Team",
		"dropdown.invite": "Mitglieder einladen",
		"dropdown.shortcuts": "Tastenkürzel",
		"dropdown.signout": "Abmelden",
		"form.field.firstName": "Vorname",
		"form.field.lastName": "Nachname",
		"form.field.username": "Benutzername",
		"form.field.country": "Land",
		"form.field.bio": "Bio",
		"form.field.birthdate": "Geburtsdatum",
		"form.field.interests": "Interessen",
		"form.field.plan": "Tarif",
		"form.field.passwordConfirm": "Passwort bestätigen",
		"form.placeholder.firstName": "Max",
		"form.placeholder.lastName": "Mustermann",
		"form.placeholder.username": "maxm",
		"form.placeholder.country": "Land auswählen",
		"form.placeholder.bio": "Ein paar Worte über dich…",
		"form.error.required": "Pflichtfeld",
		"form.error.invalidEmail": "Ungültige E-Mail",
		"form.error.tooShort": "Mindestens {n} Zeichen",
		"form.error.mismatch": "Passwörter stimmen nicht überein",
		"form.error.weakPassword": "Schwach — Ziffer hinzufügen",
		"form.username.checking": "Wird geprüft…",
		"form.username.available": "Benutzername verfügbar",
		"form.username.taken": "Benutzername vergeben",
		"form.passwordStrength.weak": "Schwach",
		"form.passwordStrength.ok": "OK",
		"form.passwordStrength.strong": "Stark",
		"interest.design": "Design",
		"interest.dev": "Entwicklung",
		"interest.product": "Produkt",
		"interest.marketing": "Marketing",
		"country.us": "USA",
		"country.ru": "Russland",
		"country.es": "Spanien",
		"country.de": "Deutschland",
		"country.jp": "Japan",
		"country.br": "Brasilien",
		"datepicker.placeholder.date": "Datum auswählen",
		"datepicker.placeholder.range": "Zeitraum auswählen",
		"datepicker.placeholder.dateTime": "Datum und Zeit auswählen",
		"datepicker.time": "Zeit",
		"datepicker.preset.today": "Heute",
		"datepicker.preset.yesterday": "Gestern",
		"datepicker.preset.weekAgo": "Vor einer Woche",
		"datepicker.preset.monthAgo": "Vor einem Monat",
		"datepicker.preset.last24h": "Letzte 24 Stunden",
		"datepicker.preset.last7d": "Letzte 7 Tage",
		"datepicker.preset.last30d": "Letzte 30 Tage",
		"datepicker.preset.thisWeek": "Diese Woche",
		"datepicker.preset.lastWeek": "Letzte Woche",
		"datepicker.preset.thisMonth": "Dieser Monat",
		"datepicker.preset.lastMonth": "Letzter Monat",
		"datepicker.preset.thisYear": "Dieses Jahr",
		"layout.sidebar.title": "Sidebar-Layout",
		"layout.sidebar.desc": "Linkes vertikales Menü, Kopfzeile, Inhalt mit Breadcrumbs.",
		"layout.topnav.title": "Top-Nav-Layout",
		"layout.topnav.desc": "Horizontale Navigation in der Kopfzeile.",
		"layout.nav.dashboard": "Dashboard",
		"layout.nav.projects": "Projekte",
		"layout.nav.team": "Team",
		"layout.nav.reports": "Berichte",
		"layout.nav.settings": "Einstellungen",
		"layout.nav.billing": "Abrechnung",
		"layout.nav.help": "Hilfe",
		"layout.search": "Schnellsuche",
		"breadcrumb.home": "Start",
		"breadcrumb.users": "Benutzer",
		"breadcrumb.profile": "Profil",
		"breadcrumb.dashboard": "Dashboard",
		"breadcrumb.reports": "Berichte",
		"breadcrumb.q4": "Q4 2026",
		"plan.free.desc": "Für den Einstieg",
		"plan.pro.desc": "Für Profis",
		"plan.team.desc": "Für Teams",
		"nav.tabs": "Tabs",
		"nav.pagination": "Paginierung",
		"nav.menu": "Menü",
		"nav.openMenu": "Menü öffnen",
		"nav.components": "Komponenten",
		"section.tabs.title": "Tabs",
		"section.tabs.desc": "Vier visuelle Varianten, Icons, Badges, vertikale Ausrichtung.",
		"section.pagination.title": "Paginierung",
		"section.pagination.desc": "Nummeriert, kompakt, Cursor (load more), mit Seitengrößen-Auswahl. Die Tabelle weiter unten zeigt es im echten Einsatz.",
		"pagination.rowsPerPage": "Zeilen pro Seite",
		"pagination.itemsRange": "{from}–{to} von {total}",
		"pagination.pageOf": "Seite {current} von {total}",
		"pagination.shownOf": "Angezeigt {shown} von {total}",
		"pagination.loadMore": "{n} weitere laden",
		"pagination.allLoaded": "Alle geladen",
		"pagination.helperHint": "Übergib currentPage, totalPages und siblings an den Helper — er liefert ein Array aus Seitenzahlen und Ellipsis-Markern. Daraus lässt sich jede UI rendern.",
		"table.empty": "Keine Treffer"
	}
};
var I18nContext = createContext(null);
var STORAGE_KEY = "ax-styler-locale";
function detectInitial() {
	if (typeof window === "undefined") return "en";
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored && LOCALES.includes(stored)) return stored;
	} catch {}
	const nav = navigator.language.toLowerCase();
	if (nav.startsWith("ru")) return "ru";
	if (nav.startsWith("es")) return "es";
	if (nav.startsWith("de")) return "de";
	return "en";
}
function interpolate(template, vars) {
	if (!vars) return template;
	return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
function I18nProvider({ children }) {
	const [locale, setLocale] = useState(detectInitial);
	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, locale);
		} catch {}
		document.documentElement.setAttribute("lang", locale);
	}, [locale]);
	const value = useMemo(() => ({
		locale,
		setLocale,
		t: (key, vars) => interpolate(DICTIONARIES[locale][key] ?? DICTIONARIES.en[key] ?? key, vars)
	}), [locale]);
	return /* @__PURE__ */ jsx(I18nContext.Provider, {
		value,
		children
	});
}
function useI18n() {
	const ctx = useContext(I18nContext);
	if (!ctx) throw new Error("useI18n must be used inside <I18nProvider />");
	return ctx;
}
//#endregion
//#region src/components/ui/button.tsx
var buttonVariants = cva([
	"group/btn relative inline-flex items-center justify-center gap-2 select-none whitespace-nowrap",
	"font-medium tracking-tight",
	"rounded-[var(--radius-md)]",
	"transition-[background-color,color,box-shadow,transform,filter] duration-200",
	"ease-[var(--ease-smooth)]",
	"focus-visible:outline-none",
	"focus-visible:[box-shadow:0_0_0_2px_var(--bg),0_0_0_4px_var(--ring)]",
	"disabled:pointer-events-none disabled:opacity-50",
	"[&_svg]:size-4 [&_svg]:shrink-0"
].join(" "), {
	variants: {
		variant: {
			primary: [
				"text-accent-fg",
				"[background-image:var(--grad-brand)]",
				"[box-shadow:var(--shadow-brand-md)]",
				"hover:[box-shadow:var(--shadow-brand-lg)]",
				"hover:-translate-y-px hover:brightness-[1.04]",
				"active:translate-y-0 active:scale-[0.98]",
				"active:[background-image:var(--grad-brand-pressed)]",
				"active:[box-shadow:var(--shadow-brand-sm)]",
				"before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none",
				"before:[background:linear-gradient(180deg,color-mix(in_oklab,white_22%,transparent)_0%,transparent_45%)]",
				"before:opacity-70 hover:before:opacity-100 before:transition-opacity"
			].join(" "),
			secondary: [
				"text-fg",
				"[background-image:var(--grad-surface)]",
				"border border-border shadow-xs",
				"hover:bg-surface-hover hover:border-border-strong hover:shadow-sm",
				"hover:-translate-y-px",
				"active:translate-y-0 active:scale-[0.98]"
			].join(" "),
			outline: [
				"bg-transparent text-fg border border-border",
				"hover:bg-surface hover:border-border-strong",
				"active:scale-[0.98]"
			].join(" "),
			ghost: [
				"bg-transparent text-fg",
				"hover:bg-surface",
				"active:scale-[0.98]"
			].join(" "),
			danger: [
				"text-danger-fg",
				"[background-image:linear-gradient(180deg,color-mix(in_oklab,white_8%,var(--danger))_0%,var(--danger)_50%,color-mix(in_oklab,black_8%,var(--danger))_100%)]",
				"[box-shadow:inset_0_1px_0_0_color-mix(in_oklab,white_28%,transparent),0_6px_16px_-4px_color-mix(in_oklab,var(--danger)_45%,transparent)]",
				"hover:[box-shadow:inset_0_1px_0_0_color-mix(in_oklab,white_32%,transparent),0_12px_28px_-6px_color-mix(in_oklab,var(--danger)_55%,transparent)]",
				"hover:-translate-y-px hover:brightness-[1.04]",
				"active:translate-y-0 active:scale-[0.98]"
			].join(" "),
			link: ["bg-transparent text-accent underline-offset-4", "hover:underline px-0 h-auto"].join(" ")
		},
		size: {
			sm: "h-8 px-3 text-[13px]",
			md: "h-10 px-4 text-sm",
			lg: "h-12 px-6 text-base",
			icon: "h-10 w-10 p-0"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = forwardRef(({ className, variant, size, asChild, loading, disabled, leftIcon, rightIcon, children, ...props }, ref) => {
	const Comp = asChild ? Slot : "button";
	const content = asChild ? children : /* @__PURE__ */ jsxs(Fragment, { children: [
		loading ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : leftIcon,
		/* @__PURE__ */ jsx("span", {
			className: "relative inline-flex items-center gap-2",
			children
		}),
		!loading && rightIcon
	] });
	return /* @__PURE__ */ jsx(Comp, {
		ref,
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		disabled: disabled || loading,
		...props,
		children: content
	});
});
Button.displayName = "Button";
//#endregion
//#region src/components/ui/input.tsx
var Input = forwardRef(({ className, type = "text", leftIcon, rightSlot, invalid, disabled, ...props }, ref) => {
	return /* @__PURE__ */ jsxs("div", {
		className: cn("group relative flex h-10 w-full items-center gap-2", "rounded-[var(--radius-md)] border bg-bg-elevated px-3", "shadow-xs transition-[box-shadow,border-color] duration-200 ease-[var(--ease-smooth)]", "has-[input:focus-visible]:[box-shadow:var(--shadow-focus)]", invalid ? "border-danger has-[input:focus-visible]:[box-shadow:var(--shadow-focus-danger)]" : "border-border has-[input:focus-visible]:border-accent hover:border-border-strong", disabled && "opacity-50 cursor-not-allowed", className),
		children: [
			leftIcon ? /* @__PURE__ */ jsx("span", {
				className: "text-fg-muted [&>svg]:size-4 shrink-0",
				children: leftIcon
			}) : null,
			/* @__PURE__ */ jsx("input", {
				ref,
				type,
				disabled,
				className: cn("peer flex-1 bg-transparent text-sm text-fg outline-none", "placeholder:text-fg-subtle", "disabled:cursor-not-allowed"),
				...props
			}),
			rightSlot ? /* @__PURE__ */ jsx("span", {
				className: "shrink-0",
				children: rightSlot
			}) : null
		]
	});
});
Input.displayName = "Input";
//#endregion
//#region src/components/ui/textarea.tsx
var Textarea = forwardRef(({ className, invalid, ...props }, ref) => {
	return /* @__PURE__ */ jsx("textarea", {
		ref,
		className: cn("w-full min-h-24 rounded-[var(--radius-md)] border bg-bg-elevated px-3 py-2.5", "text-sm text-fg shadow-xs outline-none resize-y", "placeholder:text-fg-subtle", "transition-[box-shadow,border-color] duration-200 ease-[var(--ease-smooth)]", "focus-visible:[box-shadow:var(--shadow-focus)]", "disabled:cursor-not-allowed disabled:opacity-50", invalid ? "border-danger focus-visible:[box-shadow:var(--shadow-focus-danger)]" : "border-border focus-visible:border-accent hover:border-border-strong", className),
		...props
	});
});
Textarea.displayName = "Textarea";
//#endregion
//#region src/components/ui/label.tsx
var Label = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, {
	ref,
	className: cn("text-sm font-medium text-fg leading-none", "peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
	...props
}));
Label.displayName = LabelPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/badge.tsx
var badgeVariants = cva("inline-flex items-center gap-1 rounded-full font-medium tracking-tight whitespace-nowrap [&_svg]:size-3", {
	variants: {
		variant: {
			brand: "bg-[color-mix(in_oklab,var(--brand-500)_15%,transparent)] text-accent border border-[color-mix(in_oklab,var(--brand-500)_25%,transparent)]",
			solid: "bg-accent text-accent-fg",
			neutral: "bg-surface-2 text-fg border border-border",
			outline: "bg-transparent text-fg border border-border",
			success: "bg-success-bg text-success border border-[color-mix(in_oklab,var(--success)_25%,transparent)]",
			warning: "bg-warning-bg text-warning border border-[color-mix(in_oklab,var(--warning)_25%,transparent)]",
			danger: "bg-danger-bg text-danger border border-[color-mix(in_oklab,var(--danger)_25%,transparent)]",
			info: "bg-info-bg text-info border border-[color-mix(in_oklab,var(--info)_25%,transparent)]"
		},
		size: {
			sm: "h-5 px-2 text-[11px]",
			md: "h-6 px-2.5 text-xs"
		}
	},
	defaultVariants: {
		variant: "brand",
		size: "md"
	}
});
function Badge({ className, variant, size, dot, children, ...props }) {
	return /* @__PURE__ */ jsxs("span", {
		className: cn(badgeVariants({
			variant,
			size
		}), className),
		...props,
		children: [dot ? /* @__PURE__ */ jsx("span", {
			className: "size-1.5 rounded-full bg-current opacity-90",
			"aria-hidden": true
		}) : null, children]
	});
}
//#endregion
//#region src/components/ui/avatar.tsx
var Avatar = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AvatarPrimitive.Root, {
	ref,
	className: cn("relative flex size-9 shrink-0 overflow-hidden rounded-full bg-surface-2 border border-border", className),
	...props
}));
Avatar.displayName = AvatarPrimitive.Root.displayName;
var AvatarImage = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AvatarPrimitive.Image, {
	ref,
	className: cn("aspect-square size-full object-cover", className),
	...props
}));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
var AvatarFallback = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AvatarPrimitive.Fallback, {
	ref,
	className: cn("flex size-full items-center justify-center text-xs font-semibold text-fg-muted", className),
	...props
}));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
//#endregion
//#region src/components/ui/card.tsx
var Card = forwardRef(({ className, interactive, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("rounded-[var(--radius-lg)] border border-border bg-bg-elevated", "[box-shadow:var(--shadow-card)]", "transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-smooth)]", interactive && [
		"cursor-pointer",
		"hover:-translate-y-0.5",
		"hover:[box-shadow:var(--shadow-soft-glow)]",
		"hover:border-[color-mix(in_oklab,var(--brand-500)_25%,var(--border))]"
	], className),
	...props
}));
Card.displayName = "Card";
var CardHeader = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("flex flex-col gap-1.5 p-5", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("h3", {
	ref,
	className: cn("text-base font-semibold tracking-tight text-fg", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("p", {
	ref,
	className: cn("text-sm text-fg-muted leading-relaxed", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("p-5 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("flex items-center gap-2 p-5 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
//#endregion
//#region src/components/ui/switch.tsx
var Switch = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SwitchPrimitive.Root, {
	ref,
	className: cn("peer relative inline-flex h-6 w-11 shrink-0 items-center rounded-full", "border border-transparent", "transition-[background-color,box-shadow] duration-200 ease-[var(--ease-smooth)]", "focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_var(--bg),0_0_0_4px_var(--ring)]", "disabled:cursor-not-allowed disabled:opacity-50", "data-[state=unchecked]:bg-surface-2", "data-[state=checked]:bg-accent", "data-[state=checked]:[box-shadow:0_0_0_3px_color-mix(in_oklab,var(--brand-500)_22%,transparent),0_6px_18px_-3px_color-mix(in_oklab,var(--brand-500)_50%,transparent)]", className),
	...props,
	children: /* @__PURE__ */ jsx(SwitchPrimitive.Thumb, { className: cn("pointer-events-none block size-5 rounded-full bg-white shadow-md ring-0", "transition-transform", "data-[state=unchecked]:translate-x-0.5", "data-[state=checked]:translate-x-[22px]") })
}));
Switch.displayName = SwitchPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/checkbox.tsx
var Checkbox = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(CheckboxPrimitive.Root, {
	ref,
	className: cn("peer size-4 shrink-0 rounded-[var(--radius-xs)] border border-border-strong bg-bg-elevated", "transition-[background-color,border-color,box-shadow] duration-200 ease-[var(--ease-smooth)]", "focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_var(--bg),0_0_0_4px_var(--ring)]", "disabled:cursor-not-allowed disabled:opacity-50", "data-[state=checked]:bg-accent data-[state=checked]:border-accent data-[state=checked]:text-accent-fg", "data-[state=checked]:[box-shadow:0_0_0_3px_color-mix(in_oklab,var(--brand-500)_22%,transparent),0_4px_14px_-2px_color-mix(in_oklab,var(--brand-500)_45%,transparent)]", "data-[state=indeterminate]:bg-accent data-[state=indeterminate]:border-accent data-[state=indeterminate]:text-accent-fg", "data-[state=indeterminate]:[box-shadow:0_0_0_3px_color-mix(in_oklab,var(--brand-500)_22%,transparent),0_4px_14px_-2px_color-mix(in_oklab,var(--brand-500)_45%,transparent)]", className),
	...props,
	children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, {
		className: "flex items-center justify-center text-current",
		children: props.checked === "indeterminate" ? /* @__PURE__ */ jsx(Minus, { className: "size-3" }) : /* @__PURE__ */ jsx(Check, {
			className: "size-3",
			strokeWidth: 3
		})
	})
}));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/radio-group.tsx
var RadioGroup = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(RadioGroupPrimitive.Root, {
	ref,
	className: cn("grid gap-2", className),
	...props
}));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
var RadioGroupItem = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(RadioGroupPrimitive.Item, {
	ref,
	className: cn("peer aspect-square size-4 shrink-0 rounded-full border border-border-strong bg-bg-elevated", "transition-[background-color,border-color,box-shadow] duration-200 ease-[var(--ease-smooth)]", "focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_var(--bg),0_0_0_4px_var(--ring)]", "disabled:cursor-not-allowed disabled:opacity-50", "data-[state=checked]:border-accent", "data-[state=checked]:[box-shadow:0_0_0_3px_color-mix(in_oklab,var(--brand-500)_22%,transparent),0_4px_14px_-2px_color-mix(in_oklab,var(--brand-500)_45%,transparent)]", className),
	...props,
	children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, {
		className: "flex items-center justify-center",
		children: /* @__PURE__ */ jsx("span", {
			className: "size-2 rounded-full bg-accent",
			"aria-hidden": true
		})
	})
}));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
//#endregion
//#region src/components/ui/select.tsx
var Select = SelectPrimitive.Root;
var SelectGroup = SelectPrimitive.Group;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Trigger, {
	ref,
	className: cn("flex h-10 w-full items-center justify-between gap-2 rounded-[var(--radius-md)]", "border border-border bg-bg-elevated px-3 py-2 text-sm shadow-xs", "data-[placeholder]:text-fg-subtle", "transition-[box-shadow,border-color]", "focus-visible:outline-none focus-visible:border-accent", "focus-visible:[box-shadow:var(--shadow-focus)]", "disabled:cursor-not-allowed disabled:opacity-50", "[&>span]:truncate", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(SelectPrimitive.Icon, {
		asChild: true,
		children: /* @__PURE__ */ jsx(ChevronDown, { className: "size-4 text-fg-muted" })
	})]
}));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollUpButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronUp, { className: "size-4" })
}));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.ScrollDownButton, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ jsx(ChevronDown, { className: "size-4" })
}));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(SelectPrimitive.Content, {
	ref,
	position,
	className: cn("relative z-50 max-h-96 min-w-32 overflow-hidden", "rounded-[var(--radius-md)] border border-border bg-bg-elevated text-fg shadow-lg", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1", className),
	...props,
	children: [
		/* @__PURE__ */ jsx(SelectScrollUpButton, {}),
		/* @__PURE__ */ jsx(SelectPrimitive.Viewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ jsx(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Label, {
	ref,
	className: cn("px-2 py-1.5 text-xs font-medium text-fg-muted", className),
	...props
}));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Item, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center gap-2 rounded-[var(--radius-sm)]", "py-1.5 pl-2 pr-8 text-sm outline-none", "focus:bg-surface focus:text-fg", "data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children }), /* @__PURE__ */ jsx("span", {
		className: "absolute right-2 flex size-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, {
			className: "size-4 text-accent",
			strokeWidth: 2.5
		}) })
	})]
}));
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-border", className),
	...props
}));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
//#endregion
//#region src/components/ui/dialog.tsx
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
var DialogClose = DialogPrimitive.Close;
var DialogOverlay = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-overlay backdrop-blur-md", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0", className),
	...props
}));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = forwardRef(({ className, children, showClose = true, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: cn("fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4", "rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-6", "[box-shadow:var(--shadow-xl),0_0_0_1px_color-mix(in_oklab,var(--brand-500)_8%,transparent),0_24px_64px_-12px_color-mix(in_oklab,var(--brand-500)_22%,transparent)]", "duration-300 ease-[var(--ease-smooth)]", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0", "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95", "data-[state=open]:slide-in-from-bottom-2 data-[state=closed]:slide-out-to-bottom-2", className),
	...props,
	children: [children, showClose && /* @__PURE__ */ jsxs(DialogClose, {
		className: cn("absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-[var(--radius-sm)]", "text-fg-muted hover:bg-surface hover:text-fg", "transition-colors focus-visible:outline-none", "focus-visible:[box-shadow:0_0_0_2px_var(--bg),0_0_0_4px_var(--ring)]"),
		children: [/* @__PURE__ */ jsx(X, { className: "size-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("flex flex-col gap-1.5 text-left pr-8", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var DialogTitle = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold tracking-tight text-fg", className),
	...props
}));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-fg-muted leading-relaxed", className),
	...props
}));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
//#endregion
//#region src/components/ui/drawer.tsx
/**
* Side drawer built on top of Radix Dialog. Slides in from the right by default.
* Use Drawer / DrawerTrigger / DrawerContent etc.
*/
var Drawer = DialogPrimitive.Root;
var DrawerTrigger = DialogPrimitive.Trigger;
var DrawerClose = DialogPrimitive.Close;
var DrawerPortal = DialogPrimitive.Portal;
var sideClasses = {
	right: ["inset-y-0 right-0 h-full w-full max-w-md border-l", "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right"].join(" "),
	left: ["inset-y-0 left-0 h-full w-full max-w-md border-r", "data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left"].join(" "),
	top: ["inset-x-0 top-0 w-full border-b", "data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top"].join(" "),
	bottom: ["inset-x-0 bottom-0 w-full border-t rounded-t-[var(--radius-2xl)]", "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom"].join(" ")
};
var DrawerContent = forwardRef(({ className, children, side = "right", ...props }, ref) => /* @__PURE__ */ jsxs(DrawerPortal, { children: [/* @__PURE__ */ jsx(DialogPrimitive.Overlay, { className: cn("fixed inset-0 z-50 bg-overlay backdrop-blur-md", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0") }), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: cn("fixed z-50 flex flex-col gap-4 bg-bg-elevated p-6 shadow-xl border-border", "duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out", sideClasses[side], className),
	...props,
	children: [children, /* @__PURE__ */ jsxs(DrawerClose, {
		className: cn("absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-[var(--radius-sm)]", "text-fg-muted hover:bg-surface hover:text-fg transition-colors", "focus-visible:outline-none", "focus-visible:[box-shadow:0_0_0_2px_var(--bg),0_0_0_4px_var(--ring)]"),
		children: [/* @__PURE__ */ jsx(X, { className: "size-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DrawerContent.displayName = "DrawerContent";
function DrawerHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("flex flex-col gap-1.5 pr-8", className),
		...props
	});
}
function DrawerFooter({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var DrawerTitle = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold tracking-tight text-fg", className),
	...props
}));
DrawerTitle.displayName = "DrawerTitle";
var DrawerDescription = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-fg-muted leading-relaxed", className),
	...props
}));
DrawerDescription.displayName = "DrawerDescription";
//#endregion
//#region src/components/ui/tooltip.tsx
var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipContent = forwardRef(({ className, sideOffset = 6, children, ...props }, ref) => /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(TooltipPrimitive.Content, {
	ref,
	sideOffset,
	className: cn("z-50 max-w-xs px-2.5 py-1.5 text-xs font-medium leading-tight", "rounded-[var(--radius-sm)] bg-fg text-bg shadow-md", "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=delayed-open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2", "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, {
		className: "fill-fg",
		width: 10,
		height: 5
	})]
}) }));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
//#endregion
//#region src/components/ui/tabs.tsx
var TabsContext = createContext({
	variant: "default",
	orientation: "horizontal"
});
var Tabs = forwardRef(({ variant = "default", orientation = "horizontal", ...props }, ref) => {
	const value = useMemo(() => ({
		variant,
		orientation
	}), [variant, orientation]);
	return /* @__PURE__ */ jsx(TabsContext.Provider, {
		value,
		children: /* @__PURE__ */ jsx(TabsPrimitive.Root, {
			ref,
			orientation,
			...props
		})
	});
});
Tabs.displayName = TabsPrimitive.Root.displayName;
var TabsList = forwardRef(({ className, ...props }, ref) => {
	const { variant, orientation } = useContext(TabsContext);
	return /* @__PURE__ */ jsx(TabsPrimitive.List, {
		ref,
		className: cn("inline-flex items-center", orientation === "vertical" ? "flex-col h-auto items-stretch" : "h-10", variant === "default" && (orientation === "vertical" ? "w-44 gap-1 rounded-[var(--radius-md)] border border-border bg-surface p-1" : "gap-1 rounded-[var(--radius-md)] bg-surface p-1 border border-border"), variant === "underline" && (orientation === "vertical" ? "w-44 gap-0.5 border-r border-border" : "gap-2 border-b border-border"), variant === "pills" && "gap-1.5", variant === "subtle" && "gap-1", className),
		...props
	});
});
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = forwardRef(({ className, ...props }, ref) => {
	const { variant, orientation } = useContext(TabsContext);
	return /* @__PURE__ */ jsx(TabsPrimitive.Trigger, {
		ref,
		className: cn("inline-flex items-center justify-center gap-2 whitespace-nowrap", "text-sm font-medium text-fg-muted transition-all", "focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_var(--bg),0_0_0_4px_var(--ring)]", "disabled:pointer-events-none disabled:opacity-50", "[&_svg]:size-4 [&_svg]:shrink-0", variant === "default" && [
			"rounded-[var(--radius-sm)] px-3 py-1.5",
			"hover:text-fg",
			"data-[state=active]:bg-bg-elevated data-[state=active]:text-fg data-[state=active]:shadow-xs",
			orientation === "vertical" && "justify-start"
		], variant === "underline" && [
			"relative px-1 py-2.5 -mb-px",
			"hover:text-fg",
			"data-[state=active]:text-fg",
			orientation === "horizontal" ? "data-[state=active]:after:content-[\"\"] data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:-bottom-px data-[state=active]:after:h-0.5 data-[state=active]:after:bg-accent data-[state=active]:after:rounded-full data-[state=active]:after:[box-shadow:0_0_8px_color-mix(in_oklab,var(--brand-500)_55%,transparent)]" : "justify-start py-2 pr-3 -mr-px data-[state=active]:after:content-[\"\"] data-[state=active]:after:absolute data-[state=active]:after:top-0 data-[state=active]:after:bottom-0 data-[state=active]:after:-right-px data-[state=active]:after:w-0.5 data-[state=active]:after:bg-accent data-[state=active]:after:rounded-full data-[state=active]:after:[box-shadow:0_0_8px_color-mix(in_oklab,var(--brand-500)_55%,transparent)]"
		], variant === "pills" && [
			"rounded-full px-3.5 py-1.5",
			"hover:text-fg hover:bg-surface",
			"data-[state=active]:text-accent-fg",
			"data-[state=active]:[background-image:var(--grad-brand)]",
			"data-[state=active]:[box-shadow:var(--shadow-brand-md)]",
			"data-[state=active]:hover:brightness-[1.04]",
			orientation === "vertical" && "justify-start"
		], variant === "subtle" && [
			"rounded-[var(--radius-sm)] px-3 py-1.5",
			"hover:text-fg hover:bg-surface",
			"data-[state=active]:bg-[color-mix(in_oklab,var(--brand-500)_15%,transparent)] data-[state=active]:text-accent",
			orientation === "vertical" && "justify-start"
		], className),
		...props
	});
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.Content, {
	ref,
	className: cn("mt-4 focus-visible:outline-none", "data-[state=active]:animate-in data-[state=active]:fade-in-50", className),
	...props
}));
TabsContent.displayName = TabsPrimitive.Content.displayName;
//#endregion
//#region src/components/ui/pagination.tsx
/**
* Pagination — composable primitives. For the smart "1 … 4 5 6 … 20"
* layout, use `paginationRange(currentPage, totalPages, siblings)` to get
* the array of page numbers + 'ellipsis' markers and map over it.
*/
var Pagination = ({ className, ...props }) => /* @__PURE__ */ jsx("nav", {
	role: "navigation",
	"aria-label": "pagination",
	className: cn("mx-auto flex w-full justify-center", className),
	...props
});
Pagination.displayName = "Pagination";
var PaginationContent = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("ul", {
	ref,
	className: cn("flex flex-row items-center gap-1", className),
	...props
}));
PaginationContent.displayName = "PaginationContent";
var PaginationItem = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("li", {
	ref,
	className: cn("", className),
	...props
}));
PaginationItem.displayName = "PaginationItem";
var PaginationLink = ({ className, isActive, size = "icon", ...props }) => /* @__PURE__ */ jsx("a", {
	"aria-current": isActive ? "page" : void 0,
	className: cn(buttonVariants({
		variant: isActive ? "primary" : "ghost",
		size
	}), "cursor-pointer select-none", isActive && "pointer-events-auto", className),
	...props
});
PaginationLink.displayName = "PaginationLink";
var PaginationPrevious = ({ className, label = "Previous", showLabel = true, ...props }) => /* @__PURE__ */ jsxs(PaginationLink, {
	"aria-label": "Go to previous page",
	size: showLabel ? "sm" : "icon",
	className: cn("gap-1.5 px-2.5", className),
	...props,
	children: [/* @__PURE__ */ jsx(ChevronLeft, { className: "size-4" }), showLabel ? /* @__PURE__ */ jsx("span", { children: label }) : null]
});
PaginationPrevious.displayName = "PaginationPrevious";
var PaginationNext = ({ className, label = "Next", showLabel = true, ...props }) => /* @__PURE__ */ jsxs(PaginationLink, {
	"aria-label": "Go to next page",
	size: showLabel ? "sm" : "icon",
	className: cn("gap-1.5 px-2.5", className),
	...props,
	children: [showLabel ? /* @__PURE__ */ jsx("span", { children: label }) : null, /* @__PURE__ */ jsx(ChevronRight, { className: "size-4" })]
});
PaginationNext.displayName = "PaginationNext";
var PaginationEllipsis = ({ className, ...props }) => /* @__PURE__ */ jsxs("span", {
	"aria-hidden": true,
	className: cn("flex h-9 w-9 items-center justify-center text-fg-subtle", className),
	...props,
	children: [/* @__PURE__ */ jsx(MoreHorizontal, { className: "size-4" }), /* @__PURE__ */ jsx("span", {
		className: "sr-only",
		children: "More pages"
	})]
});
PaginationEllipsis.displayName = "PaginationEllipsis";
/**
* Compute a smart pagination range with ellipsis markers. Always shows
* the first and last pages, and `siblings` neighbors around the current page.
*
* paginationRange(7, 20, 1) => [1, 'ellipsis', 6, 7, 8, 'ellipsis', 20]
* paginationRange(2, 20, 1) => [1, 2, 3, 4, 5, 'ellipsis', 20]
* paginationRange(19, 20, 1) => [1, 'ellipsis', 16, 17, 18, 19, 20]
*/
function paginationRange(current, total, siblings = 1) {
	if (total <= 0) return [];
	if (total <= siblings * 2 + 5) return Array.from({ length: total }, (_, i) => i + 1);
	const leftSibling = Math.max(current - siblings, 1);
	const rightSibling = Math.min(current + siblings, total);
	const showLeftEllipsis = leftSibling > 2;
	const showRightEllipsis = rightSibling < total - 1;
	if (!showLeftEllipsis && showRightEllipsis) {
		const leftCount = 3 + 2 * siblings;
		return [
			...Array.from({ length: leftCount }, (_, i) => i + 1),
			"ellipsis",
			total
		];
	}
	if (showLeftEllipsis && !showRightEllipsis) {
		const rightCount = 3 + 2 * siblings;
		return [
			1,
			"ellipsis",
			...Array.from({ length: rightCount }, (_, i) => total - rightCount + 1 + i)
		];
	}
	return [
		1,
		"ellipsis",
		...Array.from({ length: rightSibling - leftSibling + 1 }, (_, i) => leftSibling + i),
		"ellipsis",
		total
	];
}
//#endregion
//#region src/components/ui/dropdown-menu.tsx
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuGroup = DropdownMenuPrimitive.Group;
var DropdownMenuPortal = DropdownMenuPrimitive.Portal;
var DropdownMenuSub = DropdownMenuPrimitive.Sub;
var DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
var DropdownMenuSubTrigger = forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.SubTrigger, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-[var(--radius-sm)]", "px-2 py-1.5 text-sm outline-none", "focus:bg-surface data-[state=open]:bg-surface", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto size-4" })]
}));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.SubContent, {
	ref,
	className: cn("z-50 min-w-32 overflow-hidden rounded-[var(--radius-md)] border border-border", "bg-bg-elevated p-1 text-fg shadow-lg", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
	...props
}));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.Content, {
	ref,
	sideOffset,
	className: cn("z-50 min-w-44 overflow-hidden rounded-[var(--radius-md)] border border-border", "bg-bg-elevated p-1 text-fg shadow-lg", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2", "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2", className),
	...props
}) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Item, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-[var(--radius-sm)]", "px-2 py-1.5 text-sm outline-none transition-colors", "focus:bg-surface focus:text-fg", "data-[disabled]:pointer-events-none data-[disabled]:opacity-50", "[&_svg]:size-4 [&_svg]:text-fg-muted", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.CheckboxItem, {
	ref,
	checked,
	className: cn("relative flex cursor-default select-none items-center rounded-[var(--radius-sm)]", "py-1.5 pl-8 pr-2 text-sm outline-none transition-colors", "focus:bg-surface focus:text-fg", "data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute left-2 flex size-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, {
			className: "size-4 text-accent",
			strokeWidth: 2.5
		}) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.RadioItem, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-[var(--radius-sm)]", "py-1.5 pl-8 pr-2 text-sm outline-none transition-colors", "focus:bg-surface focus:text-fg", "data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute left-2 flex size-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "size-2 fill-accent text-accent" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Label, {
	ref,
	className: cn("px-2 py-1.5 text-xs font-medium text-fg-muted", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-border", className),
	...props
}));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
function DropdownMenuShortcut({ className, ...props }) {
	return /* @__PURE__ */ jsx("span", {
		className: cn("ml-auto text-xs tracking-widest text-fg-subtle", className),
		...props
	});
}
//#endregion
//#region src/components/ui/popover.tsx
var Popover = PopoverPrimitive.Root;
var PopoverTrigger = PopoverPrimitive.Trigger;
var PopoverAnchor = PopoverPrimitive.Anchor;
var PopoverClose = PopoverPrimitive.Close;
var PopoverContent = forwardRef(({ className, align = "center", sideOffset = 6, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(PopoverPrimitive.Content, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-[var(--radius-lg)] border border-border bg-bg-elevated p-4", "shadow-lg outline-none", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2", "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2", className),
	...props
}) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
//#endregion
//#region src/components/ui/table.tsx
var Table = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	className: "w-full overflow-auto rounded-[var(--radius-lg)] border border-border bg-bg-elevated",
	children: /* @__PURE__ */ jsx("table", {
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	})
}));
Table.displayName = "Table";
var TableHeader = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", {
	ref,
	className: cn("bg-surface/60 [&_tr]:border-b border-border", className),
	...props
}));
TableHeader.displayName = "TableHeader";
var TableBody = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tbody", {
	ref,
	className: cn("[&_tr:last-child]:border-0", className),
	...props
}));
TableBody.displayName = "TableBody";
var TableRow = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tr", {
	ref,
	className: cn("border-b border-border transition-colors hover:bg-surface/50 data-[state=selected]:bg-surface", className),
	...props
}));
TableRow.displayName = "TableRow";
var TableHead = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("th", {
	ref,
	className: cn("h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-fg-muted", className),
	...props
}));
TableHead.displayName = "TableHead";
var TableCell = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("td", {
	ref,
	className: cn("px-4 py-3 text-sm align-middle", className),
	...props
}));
TableCell.displayName = "TableCell";
//#endregion
//#region src/components/ui/calendar.tsx
var LOCALE_MAP = {
	ru,
	en: enUS,
	es,
	de
};
function getDateLocale(locale) {
	return LOCALE_MAP[locale];
}
/**
* Calendar — react-day-picker v9 wrapper, fully styled via classNames.
* The default CSS from `react-day-picker/style.css` is intentionally NOT imported:
* its rules sit in the unlayered cascade and would override our themed Tailwind
* utilities. Everything below is hand-rolled so light/dark range colors stay correct.
*/
function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
	const { locale } = useI18n();
	const navBtn = cn("inline-flex size-8 items-center justify-center rounded-[var(--radius-sm)]", "text-fg-muted hover:bg-surface hover:text-fg transition-colors", "disabled:opacity-30 disabled:hover:bg-transparent");
	const stripeBg = "bg-[color-mix(in_oklab,var(--brand-500)_14%,transparent)]";
	return /* @__PURE__ */ jsx(DayPicker, {
		showOutsideDays,
		locale: LOCALE_MAP[locale],
		weekStartsOn: locale === "en" ? 0 : 1,
		className: cn("p-2", className),
		classNames: {
			months: "flex flex-col sm:flex-row gap-6",
			month: "flex flex-col gap-3 relative",
			month_caption: "flex h-9 items-center justify-center text-sm font-semibold tracking-tight capitalize",
			caption_label: "capitalize",
			nav: "absolute inset-x-0 top-0 z-10 flex items-center justify-between px-1",
			button_previous: navBtn,
			button_next: navBtn,
			month_grid: "border-collapse",
			weekdays: "flex",
			weekday: "w-9 text-[11px] font-medium uppercase tracking-wider text-fg-subtle py-1",
			week: "flex w-full mt-1",
			day: "relative size-9 p-0 text-center text-sm",
			day_button: cn("size-9 inline-flex items-center justify-center rounded-full", "text-sm font-medium text-fg bg-transparent", "transition-colors hover:bg-surface", "focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_var(--bg),0_0_0_3px_var(--ring)]"),
			selected: cn("[&>button]:bg-accent [&>button]:text-accent-fg", "[&>button]:hover:bg-accent-hover"),
			today: "[&>button]:font-semibold [&>button]:text-accent",
			outside: "[&>button]:text-fg-subtle/60",
			disabled: "opacity-30 pointer-events-none",
			hidden: "invisible",
			range_start: cn(stripeBg, "rounded-l-full", "[&>button]:!bg-accent [&>button]:!text-accent-fg [&>button]:hover:!bg-accent-hover", "[&>button]:!rounded-full"),
			range_end: cn(stripeBg, "rounded-r-full", "[&>button]:!bg-accent [&>button]:!text-accent-fg [&>button]:hover:!bg-accent-hover", "[&>button]:!rounded-full"),
			range_middle: cn(stripeBg, "[&>button]:!bg-transparent", "[&>button]:!text-fg", "[&>button]:!rounded-none", "[&>button]:hover:!bg-[color-mix(in_oklab,var(--brand-500)_22%,transparent)]"),
			...classNames
		},
		components: { Chevron: ({ orientation }) => orientation === "left" ? /* @__PURE__ */ jsx(ChevronLeft, { className: "size-4" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "size-4" }) },
		...props
	});
}
//#endregion
//#region src/components/ui/date-picker.tsx
var defaultDatePresets = (t) => [
	{
		id: "today",
		label: t("datepicker.preset.today"),
		getValue: () => startOfDay(/* @__PURE__ */ new Date())
	},
	{
		id: "yesterday",
		label: t("datepicker.preset.yesterday"),
		getValue: () => subDays(startOfDay(/* @__PURE__ */ new Date()), 1)
	},
	{
		id: "weekAgo",
		label: t("datepicker.preset.weekAgo"),
		getValue: () => subDays(startOfDay(/* @__PURE__ */ new Date()), 7)
	},
	{
		id: "monthAgo",
		label: t("datepicker.preset.monthAgo"),
		getValue: () => subDays(startOfDay(/* @__PURE__ */ new Date()), 30)
	}
];
function DatePicker({ value, onChange, placeholder, withTime, presets, className, disabled }) {
	const { t, locale } = useI18n();
	const [open, setOpen] = useState(false);
	const finalPresets = presets === null ? null : presets ?? defaultDatePresets(t);
	function setDate(d) {
		if (!d) {
			onChange?.(void 0);
			return;
		}
		if (withTime && value) onChange?.(set(d, {
			hours: value.getHours(),
			minutes: value.getMinutes()
		}));
		else onChange?.(d);
	}
	function setTime(timeStr) {
		const [h, m] = timeStr.split(":").map(Number);
		onChange?.(set(value ?? /* @__PURE__ */ new Date(), {
			hours: h || 0,
			minutes: m || 0,
			seconds: 0,
			milliseconds: 0
		}));
	}
	const display = value ? format(value, withTime ? "PPP, HH:mm" : "PPP", { locale: getDateLocale(locale) }) : null;
	return /* @__PURE__ */ jsxs(Popover, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ jsx(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsxs("button", {
				type: "button",
				disabled,
				className: cn("inline-flex h-10 w-full items-center gap-2 rounded-[var(--radius-md)] border border-border", "bg-bg-elevated px-3 text-left text-sm shadow-xs transition-[box-shadow,border-color]", "hover:bg-surface", "focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-focus)]", "data-[state=open]:border-accent", "disabled:opacity-50 disabled:cursor-not-allowed", !display && "text-fg-subtle", className),
				children: [
					/* @__PURE__ */ jsx(CalendarIcon, { className: "size-4 text-fg-muted shrink-0" }),
					/* @__PURE__ */ jsx("span", {
						className: "flex-1 truncate",
						children: display ?? placeholder ?? t("datepicker.placeholder.date")
					}),
					value ? /* @__PURE__ */ jsx("span", {
						role: "button",
						tabIndex: -1,
						onClick: (e) => {
							e.stopPropagation();
							onChange?.(void 0);
						},
						className: "text-fg-muted hover:text-fg transition-colors p-0.5 rounded-[var(--radius-xs)]",
						"aria-label": "Clear",
						children: /* @__PURE__ */ jsx(X, { className: "size-3.5" })
					}) : null
				]
			})
		}), /* @__PURE__ */ jsx(PopoverContent, {
			align: "start",
			className: "w-auto p-0",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex",
				children: [finalPresets ? /* @__PURE__ */ jsx("div", {
					className: "border-r border-border p-2 flex flex-col gap-0.5 min-w-32",
					children: finalPresets.map((p) => /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => {
							onChange?.(p.getValue());
							setOpen(false);
						},
						className: "text-left px-2.5 py-1.5 rounded-[var(--radius-sm)] text-sm hover:bg-surface transition-colors",
						children: p.label
					}, p.id))
				}) : null, /* @__PURE__ */ jsxs("div", {
					className: "p-2",
					children: [/* @__PURE__ */ jsx(Calendar, {
						mode: "single",
						selected: value,
						onSelect: (d) => {
							setDate(d);
							if (!withTime) setOpen(false);
						},
						defaultMonth: value
					}), withTime ? /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 border-t border-border px-2 pt-3 mt-1",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-xs text-fg-muted",
								children: t("datepicker.time")
							}),
							/* @__PURE__ */ jsx("input", {
								type: "time",
								value: value ? format(value, "HH:mm") : "",
								onChange: (e) => setTime(e.target.value),
								className: cn("h-8 rounded-[var(--radius-sm)] border border-border bg-bg-elevated px-2 text-sm", "focus-visible:outline-none focus-visible:border-accent")
							}),
							/* @__PURE__ */ jsx(Button, {
								size: "sm",
								className: "ml-auto",
								onClick: () => setOpen(false),
								children: t("btn.continue")
							})
						]
					}) : null]
				})]
			})
		})]
	});
}
//#endregion
//#region src/components/ui/date-range-picker.tsx
var defaultDateRangePresets = (t, weekStartsOn = 1) => {
	const today = () => startOfDay(/* @__PURE__ */ new Date());
	const now = () => /* @__PURE__ */ new Date();
	return [
		{
			id: "today",
			label: t("datepicker.preset.today"),
			getValue: () => ({
				from: today(),
				to: endOfDay(/* @__PURE__ */ new Date())
			})
		},
		{
			id: "yesterday",
			label: t("datepicker.preset.yesterday"),
			getValue: () => ({
				from: subDays(today(), 1),
				to: endOfDay(subDays(/* @__PURE__ */ new Date(), 1))
			})
		},
		{
			id: "last24h",
			label: t("datepicker.preset.last24h"),
			getValue: () => ({
				from: subHours(now(), 24),
				to: now()
			})
		},
		{
			id: "last7d",
			label: t("datepicker.preset.last7d"),
			getValue: () => ({
				from: subDays(today(), 6),
				to: endOfDay(/* @__PURE__ */ new Date())
			})
		},
		{
			id: "last30d",
			label: t("datepicker.preset.last30d"),
			getValue: () => ({
				from: subDays(today(), 29),
				to: endOfDay(/* @__PURE__ */ new Date())
			})
		},
		{
			id: "thisWeek",
			label: t("datepicker.preset.thisWeek"),
			getValue: () => ({
				from: startOfWeek(today(), { weekStartsOn }),
				to: endOfDay(/* @__PURE__ */ new Date())
			})
		},
		{
			id: "lastWeek",
			label: t("datepicker.preset.lastWeek"),
			getValue: () => {
				const lw = subDays(today(), 7);
				return {
					from: startOfWeek(lw, { weekStartsOn }),
					to: endOfWeek(lw, { weekStartsOn })
				};
			}
		},
		{
			id: "thisMonth",
			label: t("datepicker.preset.thisMonth"),
			getValue: () => ({
				from: startOfMonth(today()),
				to: endOfDay(/* @__PURE__ */ new Date())
			})
		},
		{
			id: "lastMonth",
			label: t("datepicker.preset.lastMonth"),
			getValue: () => {
				const lm = subMonths(today(), 1);
				return {
					from: startOfMonth(lm),
					to: endOfMonth(lm)
				};
			}
		},
		{
			id: "thisYear",
			label: t("datepicker.preset.thisYear"),
			getValue: () => ({
				from: startOfYear(today()),
				to: endOfDay(/* @__PURE__ */ new Date())
			})
		}
	];
};
function DateRangePicker({ value, onChange, placeholder, presets, numberOfMonths = 2, className, disabled }) {
	const { t, locale } = useI18n();
	const [open, setOpen] = useState(false);
	const finalPresets = presets === null ? null : presets ?? defaultDateRangePresets(t, locale === "en" ? 0 : 1);
	const fmt = "PP";
	const dateLocale = getDateLocale(locale);
	const display = value?.from ? value.to ? `${format(value.from, fmt, { locale: dateLocale })} — ${format(value.to, fmt, { locale: dateLocale })}` : format(value.from, fmt, { locale: dateLocale }) : null;
	return /* @__PURE__ */ jsxs(Popover, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ jsx(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsxs("button", {
				type: "button",
				disabled,
				className: cn("inline-flex h-10 w-full items-center gap-2 rounded-[var(--radius-md)] border border-border", "bg-bg-elevated px-3 text-left text-sm shadow-xs transition-[box-shadow,border-color]", "hover:bg-surface", "focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-focus)]", "data-[state=open]:border-accent", "disabled:opacity-50 disabled:cursor-not-allowed", !display && "text-fg-subtle", className),
				children: [
					/* @__PURE__ */ jsx(CalendarIcon, { className: "size-4 text-fg-muted shrink-0" }),
					/* @__PURE__ */ jsx("span", {
						className: "flex-1 truncate",
						children: display ?? placeholder ?? t("datepicker.placeholder.range")
					}),
					value?.from ? /* @__PURE__ */ jsx("span", {
						role: "button",
						tabIndex: -1,
						onClick: (e) => {
							e.stopPropagation();
							onChange?.(void 0);
						},
						className: "text-fg-muted hover:text-fg transition-colors p-0.5 rounded-[var(--radius-xs)]",
						"aria-label": "Clear",
						children: /* @__PURE__ */ jsx(X, { className: "size-3.5" })
					}) : null
				]
			})
		}), /* @__PURE__ */ jsx(PopoverContent, {
			align: "start",
			className: "w-auto p-0",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex",
				children: [finalPresets ? /* @__PURE__ */ jsx("div", {
					className: "border-r border-border p-2 flex flex-col gap-0.5 min-w-44 max-h-[360px] overflow-auto",
					children: finalPresets.map((p) => {
						const v = value;
						const candidate = p.getValue();
						return /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => {
								onChange?.(p.getValue());
								setOpen(false);
							},
							className: cn("text-left px-2.5 py-1.5 rounded-[var(--radius-sm)] text-sm transition-colors", "hover:bg-surface", v?.from && v?.to && Math.abs(+v.from - +candidate.from) < 1e3 * 60 && Math.abs(+(v.to ?? 0) - +(candidate.to ?? 0)) < 1e3 * 60 && "bg-[color-mix(in_oklab,var(--brand-500)_15%,transparent)] text-accent"),
							children: p.label
						}, p.id);
					})
				}) : null, /* @__PURE__ */ jsxs("div", {
					className: "p-2",
					children: [/* @__PURE__ */ jsx(Calendar, {
						mode: "range",
						numberOfMonths,
						selected: value,
						onSelect: onChange,
						defaultMonth: value?.from
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 border-t border-border px-2 pt-3 mt-1",
						children: [/* @__PURE__ */ jsx(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => onChange?.(void 0),
							children: t("btn.cancel")
						}), /* @__PURE__ */ jsx(Button, {
							size: "sm",
							className: "ml-auto",
							onClick: () => setOpen(false),
							disabled: !value?.from,
							children: t("btn.continue")
						})]
					})]
				})]
			})
		})]
	});
}
//#endregion
//#region src/components/ui/breadcrumb.tsx
var Breadcrumb = forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsx("nav", {
	ref,
	"aria-label": "breadcrumb",
	...props
}));
Breadcrumb.displayName = "Breadcrumb";
var BreadcrumbList = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("ol", {
	ref,
	className: cn("flex flex-wrap items-center gap-1.5 text-sm text-fg-muted break-words sm:gap-2", className),
	...props
}));
BreadcrumbList.displayName = "BreadcrumbList";
var BreadcrumbItem = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("li", {
	ref,
	className: cn("inline-flex items-center gap-1.5", className),
	...props
}));
BreadcrumbItem.displayName = "BreadcrumbItem";
var BreadcrumbLink = forwardRef(({ asChild, className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(asChild ? Slot : "a", {
		ref,
		className: cn("hover:text-fg transition-colors rounded-[var(--radius-xs)] focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_var(--bg),0_0_0_3px_var(--ring)]", className),
		...props
	});
});
BreadcrumbLink.displayName = "BreadcrumbLink";
var BreadcrumbPage = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("span", {
	ref,
	role: "link",
	"aria-disabled": "true",
	"aria-current": "page",
	className: cn("font-medium text-fg", className),
	...props
}));
BreadcrumbPage.displayName = "BreadcrumbPage";
function BreadcrumbSeparator({ children, className, ...props }) {
	return /* @__PURE__ */ jsx("li", {
		role: "presentation",
		"aria-hidden": "true",
		className: cn("text-fg-subtle [&_svg]:size-3.5", className),
		...props,
		children: children ?? /* @__PURE__ */ jsx(ChevronRight, {})
	});
}
function BreadcrumbSeparatorSlash({ className, ...props }) {
	return /* @__PURE__ */ jsx("li", {
		role: "presentation",
		"aria-hidden": "true",
		className: cn("text-fg-subtle [&_svg]:size-3", className),
		...props,
		children: /* @__PURE__ */ jsx(Slash, {})
	});
}
function BreadcrumbEllipsis({ className, ...props }) {
	return /* @__PURE__ */ jsxs("span", {
		role: "presentation",
		"aria-hidden": "true",
		className: cn("flex size-9 items-center justify-center text-fg-muted", className),
		...props,
		children: [/* @__PURE__ */ jsx(MoreHorizontal, { className: "size-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "More"
		})]
	});
}
//#endregion
//#region src/components/ui/toaster.tsx
/**
* Toast container. Mount once at the root of the app.
* Use the `toast()` API from "sonner" anywhere to fire notifications.
*
* All visual styling — including type-specific colour identity (success,
* error, warning, info) — lives in CSS rules targeting `[data-sonner-toast]`
* in `src/index.css`. Keeping it there avoids fighting sonner's defaults
* through Tailwind utilities (whose bang-modifier syntax differs across v3/v4)
* and keeps the type halos in a single place that's easy to retune.
*/
function Toaster(props) {
	const { theme } = useTheme();
	return /* @__PURE__ */ jsx(Toaster$1, {
		theme,
		position: "top-right",
		offset: 20,
		closeButton: true,
		duration: 4e3,
		...props
	});
}
//#endregion
//#region src/components/theme-toggle.tsx
function ThemeToggle({ className }) {
	const { theme, toggle } = useTheme();
	const { t } = useI18n();
	const isDark = theme === "dark";
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick: toggle,
		"aria-label": isDark ? t("theme.light") : t("theme.dark"),
		className: cn("relative inline-flex size-10 items-center justify-center overflow-hidden", "rounded-[var(--radius-md)] border border-border bg-bg-elevated text-fg", "shadow-xs hover:bg-surface transition-colors", "focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_var(--bg),0_0_0_4px_var(--ring)]", className),
		children: /* @__PURE__ */ jsx(AnimatePresence, {
			mode: "wait",
			initial: false,
			children: /* @__PURE__ */ jsx(motion.span, {
				initial: {
					y: -16,
					opacity: 0,
					rotate: -90
				},
				animate: {
					y: 0,
					opacity: 1,
					rotate: 0
				},
				exit: {
					y: 16,
					opacity: 0,
					rotate: 90
				},
				transition: {
					duration: .18,
					ease: "easeOut"
				},
				className: "absolute inset-0 flex items-center justify-center",
				children: isDark ? /* @__PURE__ */ jsx(Moon, { className: "size-[18px]" }) : /* @__PURE__ */ jsx(Sun, { className: "size-[18px]" })
			}, theme)
		})
	});
}
//#endregion
//#region src/components/lang-switcher.tsx
function LangSwitcher({ className }) {
	const { locale, setLocale, t } = useI18n();
	const current = LOCALE_LABELS[locale];
	return /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsxs(DropdownMenuTrigger, {
		className: cn("inline-flex h-10 items-center gap-2 rounded-[var(--radius-md)] border border-border", "bg-bg-elevated px-3 text-sm font-medium text-fg shadow-xs", "hover:bg-surface transition-colors", "focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_var(--bg),0_0_0_4px_var(--ring)]", "data-[state=open]:bg-surface", className),
		children: [
			/* @__PURE__ */ jsx(Languages, { className: "size-4 text-fg-muted" }),
			/* @__PURE__ */ jsx("span", {
				className: "text-base leading-none",
				children: current.flag
			}),
			/* @__PURE__ */ jsx("span", {
				className: "uppercase tracking-wide text-xs text-fg-muted",
				children: locale
			})
		]
	}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
		align: "end",
		className: "min-w-44",
		children: [
			/* @__PURE__ */ jsx(DropdownMenuLabel, { children: t("lang.label") }),
			/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
			/* @__PURE__ */ jsx(DropdownMenuRadioGroup, {
				value: locale,
				onValueChange: (v) => setLocale(v),
				children: LOCALES.map((l) => /* @__PURE__ */ jsxs(DropdownMenuRadioItem, {
					value: l,
					children: [/* @__PURE__ */ jsx("span", {
						className: "mr-2 text-base leading-none",
						children: LOCALE_LABELS[l].flag
					}), LOCALE_LABELS[l].name]
				}, l))
			})
		]
	})] });
}
//#endregion
export { Avatar, AvatarFallback, AvatarImage, Badge, Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbSeparatorSlash, Button, Calendar, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, DatePicker, DateRangePicker, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerPortal, DrawerTitle, DrawerTrigger, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, I18nProvider, Input, LOCALES, LOCALE_LABELS, Label, LangSwitcher, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Popover, PopoverAnchor, PopoverClose, PopoverContent, PopoverTrigger, RadioGroup, RadioGroupItem, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Switch, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, ThemeProvider, ThemeToggle, Toaster, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, badgeVariants, buttonVariants, cn, defaultDatePresets, defaultDateRangePresets, getDateLocale, paginationRange, useI18n, useTheme };
