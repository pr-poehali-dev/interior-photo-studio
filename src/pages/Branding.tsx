import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const brandingAssets = [
  {
    id: 1,
    title: 'Веб-баннер',
    description: 'Горизонтальный баннер для сайта и соцсетей',
    format: '1920x600px',
    image: 'https://cdn.poehali.dev/projects/c90bc39d-4747-4b90-a372-760fa36b705f/files/75321900-e8ee-4e78-9ad5-94356891b6d9.jpg',
    type: 'banner'
  },
  {
    id: 2,
    title: 'Визитка',
    description: 'Премиум дизайн визитной карточки',
    format: '90x50мм',
    image: 'https://cdn.poehali.dev/projects/c90bc39d-4747-4b90-a372-760fa36b705f/files/68d9185f-ede3-4230-a9c2-0e638f99b4a1.jpg',
    type: 'card'
  },
  {
    id: 3,
    title: 'Инста-баннер',
    description: 'Квадратный баннер для Instagram',
    format: '1080x1080px',
    image: 'https://cdn.poehali.dev/projects/c90bc39d-4747-4b90-a372-760fa36b705f/files/addbf50a-a1ec-4125-be8b-d5b8b1eece81.jpg',
    type: 'social'
  }
];

const colorPalette = [
  { name: 'Primary Pink', hex: '#FF3366', usage: 'Основной акцент, кнопки, ссылки' },
  { name: 'Secondary Purple', hex: '#8B5CF6', usage: 'Второстепенные элементы' },
  { name: 'Accent Gold', hex: '#FFD700', usage: 'Премиум акценты, детали' },
  { name: 'Dark Base', hex: '#0A0A0A', usage: 'Основной фон' },
  { name: 'Light Text', hex: '#F5F5F5', usage: 'Основной текст' }
];

export default function Branding() {
  const handleDownload = (title: string) => {
    toast.success(`Скачивание макета: ${title}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-heading font-bold">
            <span className="text-gradient">Studio Kutuzova</span>
          </a>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            На главную
          </Button>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-heading font-bold mb-6">
              Брендинг <span className="text-gradient">Studio Kutuzova</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Премиальные макеты баннеров и визиток в фирменном стиле
            </p>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-heading font-bold mb-8">Дизайн-макеты</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {brandingAssets.map((asset, index) => (
                <Card key={asset.id} className="overflow-hidden hover-lift animate-slide-up group" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <img 
                      src={asset.image} 
                      alt={asset.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {asset.format}
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-2 mb-2">
                      <Icon 
                        name={asset.type === 'banner' ? 'Image' : asset.type === 'card' ? 'CreditCard' : 'Instagram'} 
                        className="text-primary mt-1" 
                        size={20} 
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-heading font-bold mb-1">{asset.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{asset.description}</p>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => handleDownload(asset.title)}
                    >
                      <Icon name="Download" size={16} className="mr-2" />
                      Скачать макет
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-heading font-bold mb-8">Цветовая палитра</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colorPalette.map((color, index) => (
                <Card key={color.hex} className="overflow-hidden hover-lift animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div 
                    className="h-32" 
                    style={{ backgroundColor: color.hex }}
                  />
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-heading font-bold">{color.name}</h3>
                      <code className="text-sm bg-muted px-2 py-1 rounded">{color.hex}</code>
                    </div>
                    <p className="text-sm text-muted-foreground">{color.usage}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-heading font-bold mb-8">Типографика</h2>
            <Card className="animate-scale-in">
              <CardContent className="pt-6">
                <div className="space-y-8">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Заголовки</div>
                    <div className="text-4xl font-heading font-bold">Montserrat Bold</div>
                    <div className="text-sm text-muted-foreground mt-2">
                      Используется для всех заголовков и акцентов
                    </div>
                  </div>
                  <div className="border-t border-border pt-8">
                    <div className="text-sm text-muted-foreground mb-2">Основной текст</div>
                    <div className="text-2xl">Inter Regular</div>
                    <div className="text-sm text-muted-foreground mt-2">
                      Для описаний, параграфов и основного контента
                    </div>
                  </div>
                  <div className="border-t border-border pt-8">
                    <div className="text-sm text-muted-foreground mb-2">Примеры использования</div>
                    <div className="space-y-4 bg-muted/30 p-6 rounded-lg">
                      <div className="text-5xl font-heading font-bold text-gradient">
                        Studio Kutuzova
                      </div>
                      <div className="text-xl text-muted-foreground">
                        Креативное пространство в центре Петербурга
                      </div>
                      <div className="flex gap-4">
                        <span className="text-3xl font-bold text-primary">5</span>
                        <span className="text-3xl font-bold text-secondary">350+</span>
                        <span className="text-3xl font-bold text-accent">4.9</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <Card className="bg-primary/10 border-primary/20 animate-scale-in">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center gap-4">
                  <Icon name="Sparkles" className="text-primary" size={48} />
                  <h3 className="text-2xl font-heading font-bold">Нужен уникальный дизайн?</h3>
                  <p className="text-muted-foreground max-w-2xl">
                    Разработаем полный фирменный стиль: логотип, брендбук, макеты для печати и digital
                  </p>
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Icon name="Mail" className="mr-2" />
                    Заказать брендинг
                  </Button>
                </div>
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
