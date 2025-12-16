import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const TargetingSettings = () => {
  const [selectedGeo, setSelectedGeo] = useState<string[]>(['spb']);
  const [selectedAge, setSelectedAge] = useState<string[]>(['25-34', '35-44']);
  const [selectedGender, setSelectedGender] = useState<string[]>(['all']);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['photo', 'art', 'events']);
  const [budget, setBudget] = useState('50000');
  const [duration, setDuration] = useState('30');

  const geoOptions = [
    { id: 'spb', name: 'Санкт-Петербург', reach: '5.4М' },
    { id: 'msk', name: 'Москва', reach: '12.7М' },
    { id: 'ekb', name: 'Екатеринбург', reach: '1.5М' },
    { id: 'nsk', name: 'Новосибирск', reach: '1.6М' },
    { id: 'kzn', name: 'Казань', reach: '1.3М' },
  ];

  const ageOptions = [
    { id: '18-24', name: '18-24 года', percent: '15%' },
    { id: '25-34', name: '25-34 года', percent: '28%' },
    { id: '35-44', name: '35-44 года', percent: '24%' },
    { id: '45-54', name: '45-54 года', percent: '18%' },
    { id: '55+', name: '55+ лет', percent: '15%' },
  ];

  const interestOptions = [
    { id: 'photo', name: 'Фотография', icon: 'Camera' },
    { id: 'art', name: 'Искусство', icon: 'Palette' },
    { id: 'events', name: 'Мероприятия', icon: 'Calendar' },
    { id: 'fashion', name: 'Мода', icon: 'Shirt' },
    { id: 'beauty', name: 'Красота', icon: 'Sparkles' },
    { id: 'business', name: 'Бизнес', icon: 'Briefcase' },
    { id: 'education', name: 'Обучение', icon: 'GraduationCap' },
    { id: 'travel', name: 'Путешествия', icon: 'Plane' },
  ];

  const deviceOptions = [
    { id: 'mobile', name: 'Мобильные', icon: 'Smartphone', share: '65%' },
    { id: 'desktop', name: 'Компьютеры', icon: 'Monitor', share: '30%' },
    { id: 'tablet', name: 'Планшеты', icon: 'Tablet', share: '5%' },
  ];

  const [selectedDevices, setSelectedDevices] = useState<string[]>(['mobile', 'desktop']);

  const toggleItem = (array: string[], setArray: (val: string[]) => void, item: string) => {
    if (array.includes(item)) {
      setArray(array.filter(i => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  const totalReach = selectedGeo.reduce((sum, geoId) => {
    const geo = geoOptions.find(g => g.id === geoId);
    return sum + parseFloat(geo?.reach || '0');
  }, 0);

  const handleLaunchCampaign = () => {
    toast.success('Настройки сохранены!', {
      description: 'Кампания готова к запуску. Ожидаемый охват: ' + totalReach.toFixed(1) + 'М',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-heading font-bold">
            <span className="text-gradient">Studio Kutuzova</span>
          </a>
          <Button asChild variant="ghost">
            <a href="/">
              <Icon name="ArrowLeft" className="mr-2" size={16} />
              Назад
            </a>
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Настройка <span className="text-gradient">таргетинга</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Настройте параметры рекламной кампании для максимальной эффективности
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="audience" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="audience">Аудитория</TabsTrigger>
                  <TabsTrigger value="placement">Размещение</TabsTrigger>
                  <TabsTrigger value="schedule">Расписание</TabsTrigger>
                  <TabsTrigger value="creative">Креативы</TabsTrigger>
                </TabsList>

                <TabsContent value="audience" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="MapPin" className="text-primary" size={20} />
                        География
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {geoOptions.map(geo => (
                          <div
                            key={geo.id}
                            onClick={() => toggleItem(selectedGeo, setSelectedGeo, geo.id)}
                            className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedGeo.includes(geo.id)
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox checked={selectedGeo.includes(geo.id)} />
                              <div>
                                <div className="font-medium">{geo.name}</div>
                                <div className="text-sm text-muted-foreground">Охват: {geo.reach}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Users" className="text-primary" size={20} />
                        Возраст
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {ageOptions.map(age => (
                          <div
                            key={age.id}
                            onClick={() => toggleItem(selectedAge, setSelectedAge, age.id)}
                            className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedAge.includes(age.id)
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox checked={selectedAge.includes(age.id)} />
                              <div className="font-medium">{age.name}</div>
                            </div>
                            <Badge variant="secondary">{age.percent}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="User" className="text-primary" size={20} />
                        Пол
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-3">
                        {['all', 'male', 'female'].map(gender => (
                          <div
                            key={gender}
                            onClick={() => setSelectedGender([gender])}
                            className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedGender.includes(gender)
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="text-center">
                              <div className="font-medium">
                                {gender === 'all' ? 'Все' : gender === 'male' ? 'Мужчины' : 'Женщины'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Heart" className="text-primary" size={20} />
                        Интересы
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {interestOptions.map(interest => (
                          <div
                            key={interest.id}
                            onClick={() => toggleItem(selectedInterests, setSelectedInterests, interest.id)}
                            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedInterests.includes(interest.id)
                                ? 'border-secondary bg-secondary/5'
                                : 'border-border hover:border-secondary/50'
                            }`}
                          >
                            <Checkbox checked={selectedInterests.includes(interest.id)} />
                            <Icon name={interest.icon as any} size={20} className="text-secondary" />
                            <div className="font-medium">{interest.name}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="placement" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Smartphone" className="text-primary" size={20} />
                        Устройства
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {deviceOptions.map(device => (
                          <div
                            key={device.id}
                            onClick={() => toggleItem(selectedDevices, setSelectedDevices, device.id)}
                            className={`flex flex-col items-center gap-3 p-6 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedDevices.includes(device.id)
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <Icon name={device.icon as any} size={32} className="text-primary" />
                            <div className="text-center">
                              <div className="font-medium">{device.name}</div>
                              <div className="text-sm text-muted-foreground">{device.share}</div>
                            </div>
                            <Checkbox checked={selectedDevices.includes(device.id)} />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Globe" className="text-primary" size={20} />
                        Рекламные сети
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { id: 'yandex', name: 'Яндекс.Директ', desc: 'Поиск и РСЯ', reach: 'Высокий' },
                        { id: 'vk', name: 'VK Реклама', desc: 'Соцсеть и myTarget', reach: 'Высокий' },
                        { id: 'google', name: 'Google Ads', desc: 'Поиск и медийная сеть', reach: 'Средний' },
                      ].map(network => (
                        <div key={network.id} className="flex items-center gap-4 p-4 rounded-lg border-2 border-primary bg-primary/5">
                          <Checkbox defaultChecked />
                          <div className="flex-1">
                            <div className="font-medium">{network.name}</div>
                            <div className="text-sm text-muted-foreground">{network.desc}</div>
                          </div>
                          <Badge>{network.reach}</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="schedule" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Calendar" className="text-primary" size={20} />
                        Период размещения
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Начало кампании</Label>
                          <Input type="date" defaultValue="2025-01-01" />
                        </div>
                        <div className="space-y-2">
                          <Label>Длительность (дней)</Label>
                          <Input type="number" value={duration} onChange={e => setDuration(e.target.value)} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Clock" className="text-primary" size={20} />
                        Время показов
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-primary bg-primary/5">
                          <Checkbox defaultChecked />
                          <div>
                            <div className="font-medium">Круглосуточно</div>
                            <div className="text-sm text-muted-foreground">Без ограничений по времени</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {['Утро', 'День', 'Вечер', 'Ночь'].map(time => (
                            <Button key={time} variant="outline" className="w-full">
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="DollarSign" className="text-primary" size={20} />
                        Бюджет
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Общий бюджет кампании (₽)</Label>
                        <Input type="number" value={budget} onChange={e => setBudget(e.target.value)} />
                        <div className="text-sm text-muted-foreground">
                          ~{(Number(budget) / Number(duration)).toFixed(0)} ₽/день
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Стратегия</Label>
                        <Select defaultValue="auto">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">Автоматическая</SelectItem>
                            <SelectItem value="manual">Ручное управление ставками</SelectItem>
                            <SelectItem value="cpa">Оплата за конверсию (CPA)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="creative" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Image" className="text-primary" size={20} />
                        Форматы объявлений
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { id: 'banner', name: 'Баннеры', sizes: '240x400, 300x600, 728x90' },
                        { id: 'native', name: 'Нативная реклама', sizes: 'Адаптивный' },
                        { id: 'video', name: 'Видеореклама', sizes: '16:9, 9:16, 1:1' },
                      ].map(format => (
                        <div key={format.id} className="flex items-center gap-4 p-4 rounded-lg border-2 border-secondary bg-secondary/5">
                          <Checkbox defaultChecked />
                          <div>
                            <div className="font-medium">{format.name}</div>
                            <div className="text-sm text-muted-foreground">{format.sizes}</div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="FileText" className="text-primary" size={20} />
                        Тексты объявлений
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Заголовок</Label>
                        <Input placeholder="Фотостудия Studio Kutuzova - аренда залов" />
                        <div className="text-xs text-muted-foreground">Макс. 56 символов</div>
                      </div>
                      <div className="space-y-2">
                        <Label>Описание</Label>
                        <Input placeholder="3 премиальных зала от 2500₽/час. Балкон с видом на Неву. Бронируйте онлайн!" />
                        <div className="text-xs text-muted-foreground">Макс. 90 символов</div>
                      </div>
                      <div className="space-y-2">
                        <Label>Целевая страница</Label>
                        <Input value="https://studiokutuzova.ru" readOnly />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-primary bg-gradient-to-br from-primary/10 to-secondary/10 sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-primary" size={20} />
                    Прогноз кампании
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                      <div className="text-sm text-muted-foreground mb-1">Охват аудитории</div>
                      <div className="text-3xl font-bold text-gradient">{totalReach.toFixed(1)}М</div>
                      <div className="text-xs text-muted-foreground mt-1">пользователей</div>
                    </div>

                    <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                      <div className="text-sm text-muted-foreground mb-1">Прогноз показов</div>
                      <div className="text-3xl font-bold text-primary">
                        {((Number(budget) / 300) * 1000).toLocaleString('ru-RU', { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">за {duration} дней</div>
                    </div>

                    <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                      <div className="text-sm text-muted-foreground mb-1">Ожидаемые переходы</div>
                      <div className="text-3xl font-bold text-secondary">
                        {(((Number(budget) / 300) * 1000 * 2.5) / 100).toLocaleString('ru-RU', { maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">CTR ~2.5%</div>
                    </div>

                    <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                      <div className="text-sm text-muted-foreground mb-1">Примерная стоимость заявки</div>
                      <div className="text-3xl font-bold text-accent">
                        {(Number(budget) / ((((Number(budget) / 300) * 1000 * 2.5) / 100) * 0.15)).toFixed(0)} ₽
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">при CR 15%</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Гео:</span>
                      <span className="font-medium">{selectedGeo.length} регионов</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Возраст:</span>
                      <span className="font-medium">{selectedAge.length} групп</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Интересы:</span>
                      <span className="font-medium">{selectedInterests.length} категорий</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Устройства:</span>
                      <span className="font-medium">{selectedDevices.length} типов</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg" onClick={handleLaunchCampaign}>
                    <Icon name="Rocket" className="mr-2" size={20} />
                    Запустить кампанию
                  </Button>

                  <Button variant="outline" className="w-full" asChild>
                    <a href="/calculator">
                      <Icon name="Calculator" className="mr-2" size={16} />
                      Открыть калькулятор
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetingSettings;
