import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const studios = [
  {
    id: 1,
    name: 'Лофт с видом на Неву',
    price: 3500,
    area: 80,
    style: 'Индустриальный',
    features: ['Балкон', 'Панорамные окна', 'Естественный свет'],
    image: 'https://cdn.poehali.dev/projects/c90bc39d-4747-4b90-a372-760fa36b705f/files/ca278194-082f-4638-a7ea-ed650553ead7.jpg'
  },
  {
    id: 2,
    name: 'Белая классика',
    price: 2500,
    area: 60,
    style: 'Минимализм',
    features: ['Циклорама', 'Гримерная', 'Мягкий свет'],
    image: 'https://cdn.poehali.dev/projects/c90bc39d-4747-4b90-a372-760fa36b705f/files/ca278194-082f-4638-a7ea-ed650553ead7.jpg'
  },
  {
    id: 3,
    name: 'Темная атмосфера',
    price: 3000,
    area: 70,
    style: 'Современный',
    features: ['Контрастный фон', 'Профсвет', 'Стильный интерьер'],
    image: 'https://cdn.poehali.dev/projects/c90bc39d-4747-4b90-a372-760fa36b705f/files/ca278194-082f-4638-a7ea-ed650553ead7.jpg'
  },
  {
    id: 4,
    name: 'Скандинавский уют',
    price: 2000,
    area: 50,
    style: 'Скандинавский',
    features: ['Дневной свет', 'Мебель', 'Растения'],
    image: 'https://cdn.poehali.dev/projects/c90bc39d-4747-4b90-a372-760fa36b705f/files/ca278194-082f-4638-a7ea-ed650553ead7.jpg'
  },
  {
    id: 5,
    name: 'Арт-пространство',
    price: 2800,
    area: 90,
    style: 'Креативный',
    features: ['Мастер-классы', 'Презентации', 'Фотозоны'],
    image: 'https://cdn.poehali.dev/projects/c90bc39d-4747-4b90-a372-760fa36b705f/files/ca278194-082f-4638-a7ea-ed650553ead7.jpg'
  }
];

const services = [
  { icon: 'Camera', title: 'Фотосессии', description: 'Профессиональная съемка в лучших залах' },
  { icon: 'Video', title: 'Видеосъемка', description: 'Создание контента любой сложности' },
  { icon: 'Users', title: 'Мероприятия', description: 'Вечеринки, презентации, выставки' },
  { icon: 'GraduationCap', title: 'Мастер-классы', description: 'Обучение от профессионалов' },
  { icon: 'Sparkles', title: 'Аренда декора', description: 'Авторская мебель и реквизит' },
  { icon: 'Lightbulb', title: 'Оборудование', description: 'Профессиональный свет и техника' }
];

const masterclasses = [
  { title: 'Основы студийной фотографии', date: '22 декабря', price: 3500, duration: '3 часа' },
  { title: 'Портретная съемка с естественным светом', date: '25 декабря', price: 4000, duration: '4 часа' },
  { title: 'Работа с контрастным светом', date: '28 декабря', price: 3800, duration: '3.5 часа' }
];

export default function Index() {
  const [selectedStudio, setSelectedStudio] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [hours, setHours] = useState<number>(2);
  const [bookingOpen, setBookingOpen] = useState(false);

  const calculatePrice = () => {
    if (!selectedStudio) return 0;
    const studio = studios.find(s => s.id === selectedStudio);
    return studio ? studio.price * hours : 0;
  };

  const handleBooking = () => {
    if (!selectedStudio || !selectedDate) {
      toast.error('Выберите зал и дату');
      return;
    }
    toast.success(`Запрос на бронирование отправлен! Сумма: ${calculatePrice()}₽`);
    setBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold">
            <span className="text-gradient">Studio Kutuzova</span>
          </h1>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm hover:text-primary transition-colors">О студии</a>
            <a href="#studios" className="text-sm hover:text-primary transition-colors">Залы</a>
            <a href="#services" className="text-sm hover:text-primary transition-colors">Услуги</a>
            <a href="#masterclasses" className="text-sm hover:text-primary transition-colors">Мастер-классы</a>
            <a href="/targeting" className="text-sm hover:text-accent transition-colors">Таргетинг</a>
            <a href="#contacts" className="text-sm hover:text-primary transition-colors">Контакты</a>
          </div>
          <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Calendar" size={16} className="mr-2" />
                Забронировать
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Бронирование студии</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <div>
                    <Label>Выберите зал</Label>
                    <Select onValueChange={(v) => setSelectedStudio(Number(v))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите зал" />
                      </SelectTrigger>
                      <SelectContent>
                        {studios.map(studio => (
                          <SelectItem key={studio.id} value={studio.id.toString()}>
                            {studio.name} - {studio.price}₽/час
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Количество часов</Label>
                    <Input 
                      type="number" 
                      min="1" 
                      max="12" 
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Ваше имя</Label>
                    <Input placeholder="Введите имя" />
                  </div>
                  <div>
                    <Label>Телефон</Label>
                    <Input placeholder="+7 (911) XXX-XX-XX" />
                  </div>
                </div>
                <div className="space-y-4">
                  <Label>Выберите дату</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                  {selectedStudio && (
                    <Card className="bg-muted">
                      <CardContent className="pt-6">
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span>Зал:</span>
                            <span className="font-medium">{studios.find(s => s.id === selectedStudio)?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Часов:</span>
                            <span className="font-medium">{hours}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold text-primary pt-2 border-t">
                            <span>Итого:</span>
                            <span>{calculatePrice()}₽</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
              <Button onClick={handleBooking} className="w-full bg-primary hover:bg-primary/90 mt-4">
                Забронировать за {calculatePrice()}₽
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      <section id="hero" className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-50" />
        <div className="container mx-auto text-center relative z-10 animate-fade-in">
          <h2 className="text-6xl md:text-8xl font-heading font-bold mb-6">
            Креативное<br />
            <span className="text-gradient">Пространство</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            5 уникальных залов в центре Петербурга с видом на Неву
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8" onClick={() => setBookingOpen(true)}>
              <Icon name="Calendar" className="mr-2" />
              Забронировать сейчас
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              <Icon name="Play" className="mr-2" />
              Виртуальный тур
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5</div>
              <div className="text-sm text-muted-foreground">Залов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">350+</div>
              <div className="text-sm text-muted-foreground">Съемок</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">4.9</div>
              <div className="text-sm text-muted-foreground">Рейтинг</div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h3 className="text-5xl font-heading font-bold mb-6">
                О <span className="text-gradient">Studio Kutuzova</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Мы открылись осенью 2024 года и за короткое время стали одним из самых популярных креативных пространств Петербурга. Наша команда создала уникальное место для фотосессий, съемок, мероприятий и творческих экспериментов.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" className="text-primary mt-1" size={20} />
                  <div>
                    <div className="font-medium">Локация в центре</div>
                    <div className="text-sm text-muted-foreground">5 минут от Невского проспекта</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Eye" className="text-secondary mt-1" size={20} />
                  <div>
                    <div className="font-medium">Панорамный вид</div>
                    <div className="text-sm text-muted-foreground">Балконы с видом на Неву</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Sparkles" className="text-accent mt-1" size={20} />
                  <div>
                    <div className="font-medium">Авторский дизайн</div>
                    <div className="text-sm text-muted-foreground">Уникальная мебель и декор</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/projects/c90bc39d-4747-4b90-a372-760fa36b705f/files/ca278194-082f-4638-a7ea-ed650553ead7.jpg"
                alt="Studio Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section id="studios" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h3 className="text-5xl font-heading font-bold mb-4">
              Наши <span className="text-gradient">Залы</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              5 стильных залов с разными интерьерами для любых задач
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studios.map((studio, index) => (
              <Card key={studio.id} className="overflow-hidden hover-lift animate-slide-up group" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={studio.image} 
                    alt={studio.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {studio.price}₽/час
                  </div>
                </div>
                <CardContent className="pt-6">
                  <h4 className="text-xl font-heading font-bold mb-2">{studio.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Icon name="Maximize" size={16} />
                      {studio.area}м²
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Palette" size={16} />
                      {studio.style}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {studio.features.map(feature => (
                      <span key={feature} className="text-xs bg-muted px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90" 
                    onClick={() => {
                      setSelectedStudio(studio.id);
                      setBookingOpen(true);
                    }}
                  >
                    Забронировать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h3 className="text-5xl font-heading font-bold mb-4">
              <span className="text-gradient">Услуги</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Полный спектр услуг для ваших творческих проектов
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={service.title} className="hover-lift animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} className="text-primary" size={24} />
                  </div>
                  <h4 className="text-xl font-heading font-bold mb-2">{service.title}</h4>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="masterclasses" className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 animate-fade-in">
            <h3 className="text-5xl font-heading font-bold mb-4">
              <span className="text-gradient">Мастер-классы</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Обучение от профессиональных фотографов
            </p>
          </div>
          <div className="space-y-4">
            {masterclasses.map((mc, index) => (
              <Card key={mc.title} className="hover-lift animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-heading font-bold mb-2">{mc.title}</h4>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={16} />
                          {mc.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size={16} />
                          {mc.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{mc.price}₽</div>
                      </div>
                      <Button className="bg-secondary hover:bg-secondary/90">
                        Записаться
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h3 className="text-5xl font-heading font-bold mb-4">
              <span className="text-gradient">Прайс</span>
            </h3>
            <p className="text-lg text-muted-foreground">
              Прозрачная ценовая политика
            </p>
          </div>
          <Card className="animate-scale-in">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-lg">Аренда студии</span>
                  <span className="text-xl font-bold">2 000 - 3 500₽/час</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-lg">Фотосессия с фотографом</span>
                  <span className="text-xl font-bold">от 5 000₽</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-lg">Аренда оборудования</span>
                  <span className="text-xl font-bold">от 500₽</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-lg">Мастер-классы</span>
                  <span className="text-xl font-bold">3 500 - 4 000₽</span>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 mt-6">
                  <div className="flex items-start gap-3">
                    <Icon name="Sparkles" className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-medium mb-1">Специальные предложения</div>
                      <div className="text-sm text-muted-foreground">
                        Скидка 10% для новых клиентов • Абонементы со скидкой до 20% • Специальные цены для постоянных клиентов
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 animate-fade-in">
            <h3 className="text-5xl font-heading font-bold mb-4">
              <span className="text-gradient">Контакты</span>
            </h3>
            <p className="text-lg text-muted-foreground">
              Свяжитесь с нами удобным способом
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="animate-slide-up">
              <CardContent className="pt-6">
                <h4 className="text-2xl font-heading font-bold mb-6">Как нас найти</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-medium">Адрес</div>
                      <div className="text-sm text-muted-foreground">Санкт-Петербург, Центральный район</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-medium">Телефон</div>
                      <div className="text-sm text-muted-foreground">+7 (911) XXX-XX-XX</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted-foreground">info@studio-kutuzova.ru</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-medium">Режим работы</div>
                      <div className="text-sm text-muted-foreground">Ежедневно с 10:00 до 22:00</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <CardContent className="pt-6">
                <h4 className="text-2xl font-heading font-bold mb-6">Напишите нам</h4>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success('Сообщение отправлено!'); }}>
                  <div>
                    <Label>Ваше имя</Label>
                    <Input placeholder="Введите имя" />
                  </div>
                  <div>
                    <Label>Телефон</Label>
                    <Input placeholder="+7 (911) XXX-XX-XX" />
                  </div>
                  <div>
                    <Label>Сообщение</Label>
                    <Input placeholder="Ваш вопрос или комментарий" />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Отправить
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 Studio Kutuzova. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}