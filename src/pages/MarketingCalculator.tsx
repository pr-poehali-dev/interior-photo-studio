import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

const MarketingCalculator = () => {
  const [budget, setBudget] = useState(50000);
  const [cpm, setCpm] = useState(300);
  const [ctr, setCtr] = useState(2.5);
  const [cr, setCr] = useState(15);

  const impressions = Math.round((budget / cpm) * 1000);
  const clicks = Math.round((impressions * ctr) / 100);
  const conversions = Math.round((clicks * cr) / 100);
  const cpc = budget / clicks;
  const cpa = budget / conversions;

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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Калькулятор <span className="text-gradient">эффективности</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Оцените показы, переходы, конверсии и бюджет вашей рекламной кампании
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Settings" className="text-primary" size={24} />
                    Параметры кампании
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Бюджет (₽)</Label>
                      <Input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-32 text-right"
                      />
                    </div>
                    <Slider
                      value={[budget]}
                      onValueChange={([val]) => setBudget(val)}
                      min={5000}
                      max={500000}
                      step={5000}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>CPM - стоимость 1000 показов (₽)</Label>
                      <Input
                        type="number"
                        value={cpm}
                        onChange={(e) => setCpm(Number(e.target.value))}
                        className="w-32 text-right"
                      />
                    </div>
                    <Slider
                      value={[cpm]}
                      onValueChange={([val]) => setCpm(val)}
                      min={50}
                      max={2000}
                      step={50}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>CTR - кликабельность (%)</Label>
                      <Input
                        type="number"
                        value={ctr}
                        onChange={(e) => setCtr(Number(e.target.value))}
                        className="w-32 text-right"
                        step="0.1"
                      />
                    </div>
                    <Slider
                      value={[ctr]}
                      onValueChange={([val]) => setCtr(val)}
                      min={0.5}
                      max={10}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>CR - конверсия в заявку (%)</Label>
                      <Input
                        type="number"
                        value={cr}
                        onChange={(e) => setCr(Number(e.target.value))}
                        className="w-32 text-right"
                        step="0.1"
                      />
                    </div>
                    <Slider
                      value={[cr]}
                      onValueChange={([val]) => setCr(val)}
                      min={1}
                      max={50}
                      step={0.5}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-secondary" size={24} />
                    Средние показатели по рынку
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CPM (Яндекс.Директ):</span>
                    <span className="font-medium">200-500 ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CTR (медиа):</span>
                    <span className="font-medium">1-3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CTR (поиск):</span>
                    <span className="font-medium">5-15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CR (услуги):</span>
                    <span className="font-medium">10-25%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-primary bg-gradient-to-br from-primary/10 to-secondary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BarChart3" className="text-primary" size={24} />
                    Прогноз эффективности
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                      <div className="text-sm text-muted-foreground mb-1">Показы</div>
                      <div className="text-3xl font-bold text-gradient">
                        {impressions.toLocaleString('ru-RU')}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">impressions</div>
                    </div>

                    <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                      <div className="text-sm text-muted-foreground mb-1">Переходы</div>
                      <div className="text-3xl font-bold text-primary">
                        {clicks.toLocaleString('ru-RU')}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">clicks</div>
                    </div>

                    <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                      <div className="text-sm text-muted-foreground mb-1">Заявки</div>
                      <div className="text-3xl font-bold text-secondary">
                        {conversions.toLocaleString('ru-RU')}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">conversions</div>
                    </div>

                    <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                      <div className="text-sm text-muted-foreground mb-1">CPC</div>
                      <div className="text-3xl font-bold text-gradient">
                        {cpc.toFixed(2)} ₽
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">за клик</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary via-secondary to-primary p-[2px] rounded-lg">
                    <div className="bg-background/90 backdrop-blur-sm rounded-lg p-6">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-2">Стоимость заявки</div>
                        <div className="text-5xl font-bold text-gradient mb-2">
                          {cpa.toFixed(0)} ₽
                        </div>
                        <div className="text-xs text-muted-foreground">CPA (Cost Per Action)</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Lightbulb" className="text-accent" size={24} />
                    Рекомендации
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {ctr < 2 && (
                    <div className="flex gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <Icon name="AlertCircle" className="text-amber-500 flex-shrink-0" size={20} />
                      <div>
                        <div className="font-medium text-amber-600 dark:text-amber-400 mb-1">Низкий CTR</div>
                        <div className="text-muted-foreground">Улучшите креативы и таргетинг для повышения кликабельности</div>
                      </div>
                    </div>
                  )}
                  
                  {cr < 10 && (
                    <div className="flex gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <Icon name="AlertCircle" className="text-amber-500 flex-shrink-0" size={20} />
                      <div>
                        <div className="font-medium text-amber-600 dark:text-amber-400 mb-1">Низкая конверсия</div>
                        <div className="text-muted-foreground">Проверьте посадочную страницу и форму заявки</div>
                      </div>
                    </div>
                  )}

                  {ctr >= 3 && cr >= 15 && (
                    <div className="flex gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <Icon name="CheckCircle" className="text-green-500 flex-shrink-0" size={20} />
                      <div>
                        <div className="font-medium text-green-600 dark:text-green-400 mb-1">Отличные показатели!</div>
                        <div className="text-muted-foreground">Ваши метрики выше среднерыночных</div>
                      </div>
                    </div>
                  )}

                  {cpa > 3000 && (
                    <div className="flex gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <Icon name="Info" className="text-blue-500 flex-shrink-0" size={20} />
                      <div>
                        <div className="font-medium text-blue-600 dark:text-blue-400 mb-1">Высокая стоимость заявки</div>
                        <div className="text-muted-foreground">Рассмотрите оптимизацию кампании или снижение CPM</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button className="w-full" size="lg" asChild>
                <a href="#contacts">
                  <Icon name="Send" className="mr-2" size={20} />
                  Запустить кампанию
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingCalculator;
